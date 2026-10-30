import { after } from "next/server";
import { supabase } from "@/lib/supabase";
import { normalizeUrl, plainMessage, SERVICE_UNAVAILABLE } from "@/lib/audit";

export const maxDuration = 30;

const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_LIMIT = 10;
const hits = new Map<string, number[]>();

// One IPv6 client usually holds a whole /64, so it counts as one address.
function clientKey(req: Request): string {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (!ip) return "unknown";
  if (!ip.includes(":") || ip.includes(".")) return ip;
  const [head, tail] = ip.split("%")[0].toLowerCase().split("::");
  const h = head ? head.split(":") : [];
  const t = tail === undefined ? [] : tail ? tail.split(":") : [];
  const groups = tail === undefined ? h : [...h, ...Array(8 - h.length - t.length).fill("0"), ...t];
  return groups.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":");
}

// Best effort only: each serverless instance keeps its own window. Returns seconds until a slot frees, or 0.
function waitSeconds(key: string): number {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) {
    hits.set(key, recent);
    return Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
  }
  recent.push(now);
  hits.delete(key);
  hits.set(key, recent);
  if (hits.size > 5000) hits.delete(hits.keys().next().value!);
  return 0;
}

type Issue = {
  code: string;
  category: string;
  severity: string;
  title: string;
  recommendation: string;
  evidence?: unknown;
};

type Recommendation = {
  code: string;
  priority: number;
  impact: string;
  effort: string;
  title: string;
  action: string;
  why: string;
};

const SEVERITY_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

export async function POST(req: Request) {
  let body: { url?: unknown } = {};
  try {
    body = await req.json();
  } catch {}
  const url = normalizeUrl(body.url);
  if (!url) {
    return Response.json(
      { error: { code: "invalid_url", message: "Enter a public http or https address, like example.com." } },
      { status: 400 }
    );
  }

  const wait = waitSeconds(clientKey(req));
  if (wait > 0) {
    const minutes = Math.max(1, Math.ceil(wait / 60));
    return Response.json(
      {
        error: {
          code: "rate_limited",
          message: `You have used the ${PER_IP_LIMIT} free audits for this hour. The next one opens in ${minutes} minute${minutes === 1 ? "" : "s"}. To audit many pages at once, run the Apify actor.`,
        },
      },
      { status: 429, headers: { "Retry-After": String(wait) } }
    );
  }

  const started = Date.now();
  const result = await audit(url);
  const durationMs = Date.now() - started;
  after(async () => {
    const { error } = await supabase.from("try_audits").insert({
      host: new URL(url).hostname,
      status: result.status,
      score: result.score,
      duration_ms: durationMs,
    });
    if (error) console.error(`try-audit log failed: ${error.message}`);
  });
  return Response.json(result.body, {
    status: result.status,
    headers: result.status === 200 ? { "Cache-Control": "no-store" } : undefined,
  });
}

type AuditResult = { status: number; score: number | null; body: unknown };

function fail(status: number, code: string, message: string): AuditResult {
  return { status, score: null, body: { error: { code, message } } };
}

async function audit(url: string): Promise<AuditResult> {
  const apiBase = process.env.SEO_API_BASE_URL;
  if (!apiBase) return fail(503, SERVICE_UNAVAILABLE.code, SERVICE_UNAVAILABLE.message);

  const started = Date.now();
  let upstream: Response;
  try {
    upstream = await fetch(`${apiBase}/v1/analyze?url=${encodeURIComponent(url)}`, {
      headers: process.env.SEO_API_KEY ? { "X-API-Key": process.env.SEO_API_KEY } : {},
      signal: AbortSignal.timeout(25_000),
      cache: "no-store",
    });
  } catch {
    return fail(
      504,
      "upstream_timeout",
      "The audit took longer than 25 seconds. The site may be slow to answer; try again in a minute."
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await upstream.json();
  } catch {
    return fail(502, "upstream_error", "The audit service returned an unexpected response.");
  }

  if (!upstream.ok) {
    const err = (data.error ?? {}) as { code?: string; message?: string };
    // A 401 here means the site's own service key is wrong, which the visitor cannot fix.
    if (upstream.status === 401 || (upstream.status >= 500 && !err.code)) {
      console.error(`try upstream ${upstream.status}: ${err.code ?? ""} ${err.message ?? ""}`);
      return fail(503, SERVICE_UNAVAILABLE.code, SERVICE_UNAVAILABLE.message);
    }
    return fail(
      upstream.status,
      err.code ?? "audit_failed",
      plainMessage(err.code, "That page could not be audited.")
    );
  }

  const score = data.score as { overall: number; grade: string; categories: Record<string, number> };
  const saas = data.saas as
    | { score?: { overall: number | null; grade: string | null; note?: string } }
    | undefined;
  const fetchInfo = data.fetch as { status_code?: number } | undefined;
  const metadata = data.metadata as { title?: string | null; description?: string | null } | undefined;
  const issues = ((data.issues ?? []) as Issue[])
    .filter((i) => i.severity !== "info")
    .sort((a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9))
    .map(({ code, category, severity, title, recommendation, evidence }) => ({
      code,
      category,
      severity,
      title,
      recommendation,
      caused_by: ((evidence ?? {}) as { likely_cause?: string }).likely_cause ?? null,
      evidence: summarizeEvidence(code, evidence),
    }));
  const recommendations = ((data.recommendations ?? []) as Recommendation[])
    .slice(0, 5)
    .map(({ code, priority, impact, effort, title, action, why }) => ({
      code,
      priority,
      impact,
      effort,
      title,
      action,
      why,
    }));

  return {
    status: 200,
    score: score?.overall ?? null,
    body: {
      url: data.final_url ?? url,
      status_code: fetchInfo?.status_code ?? null,
      title: metadata?.title ?? null,
      description: metadata?.description ?? null,
      score,
      saas_score: saas?.score ?? null,
      issues,
      recommendations,
      duration_ms: Date.now() - started,
    },
  };
}

// One readable line of the evidence for the issues where it changes what the owner does next.
function summarizeEvidence(code: string, evidence: unknown): string | null {
  const e = (evidence ?? {}) as Record<string, unknown>;
  if (code === "content.javascript_shell") {
    const hints = Array.isArray(e.client_render_hints) ? e.client_render_hints.join(", ") : "";
    return `${e.word_count ?? 0} words in ${e.html_bytes ?? "?"} bytes of HTML${hints ? ` · ${hints}` : ""}`;
  }
  if (code === "http.non_success_status") return `HTTP ${e.status_code}`;
  return null;
}
