import { after } from "next/server";
import { supabase } from "@/lib/supabase";

export const maxDuration = 30;

const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_LIMIT = 10;
const hits = new Map<string, number[]>();

// Best effort only: each serverless instance keeps its own window.
function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}

function normalize(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (!value || value.length > 2048) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (!parsed.hostname.includes(".")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
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
  const url = normalize(body.url);
  if (!url) {
    return Response.json(
      { error: { code: "invalid_url", message: "Enter a public http or https address, like example.com." } },
      { status: 400 }
    );
  }

  const started = Date.now();
  const result = await audit(url, req);
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

async function audit(url: string, req: Request): Promise<AuditResult> {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (!allow(ip)) {
    return fail(
      429,
      "rate_limited",
      `The free audit runs ${PER_IP_LIMIT} pages an hour. For more, use the API key or the Apify actor.`
    );
  }

  const apiBase = process.env.SEO_API_BASE_URL;
  if (!apiBase) return fail(503, "not_configured", "The audit service is not configured.");

  const started = Date.now();
  let upstream: Response;
  try {
    upstream = await fetch(`${apiBase}/v1/analyze?url=${encodeURIComponent(url)}`, {
      headers: process.env.SEO_API_KEY ? { "X-API-Key": process.env.SEO_API_KEY } : {},
      signal: AbortSignal.timeout(25_000),
      cache: "no-store",
    });
  } catch {
    return fail(504, "upstream_unavailable", "The audit service did not answer in time. Try again in a minute.");
  }

  let data: Record<string, unknown>;
  try {
    data = await upstream.json();
  } catch {
    return fail(502, "upstream_error", "The audit service returned an unexpected response.");
  }

  if (!upstream.ok) {
    const err = (data.error ?? {}) as { code?: string; message?: string };
    return fail(
      upstream.status === 401 ? 503 : upstream.status,
      err.code ?? "audit_failed",
      err.message ?? "That page could not be audited."
    );
  }

  const score = data.score as { overall: number; grade: string; categories: Record<string, number> };
  const saas = data.saas as { score?: { overall: number | null; grade: string | null } } | undefined;
  const fetchInfo = data.fetch as { status_code?: number } | undefined;
  const metadata = data.metadata as { title?: string | null; description?: string | null } | undefined;
  const issues = ((data.issues ?? []) as Issue[])
    .filter((i) => i.severity !== "info")
    .sort((a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9))
    .map(({ code, category, severity, title, recommendation }) => ({
      code,
      category,
      severity,
      title,
      recommendation,
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
