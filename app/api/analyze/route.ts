import { createHash } from "crypto";
import { after } from "next/server";
import { supabase } from "@/lib/supabase";
import { normalizeUrl, SERVICE_UNAVAILABLE } from "@/lib/audit";

const DAILY_LIMITS: Record<string, number> = {
  free: 100,
  pro: 5000,
  business: 50000,
};

const ENDPOINTS: Record<string, string> = {
  analyze: "/analyze",
  "quick-score": "/quick-score",
  metadata: "/metadata",
};

export const maxDuration = 30;

const DB_TIMEOUT_MS = 4_000;

function error(status: number, code: string, message: string, headers?: HeadersInit) {
  return Response.json({ error: { code, message } }, { status, headers });
}

function unavailable(reason: string) {
  console.error(`analyze unavailable: ${reason}`);
  return error(503, SERVICE_UNAVAILABLE.code, SERVICE_UNAVAILABLE.message);
}

export async function GET(req: Request) {
  const t0 = Date.now();
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("url");
  const endpoint = searchParams.get("endpoint") ?? "analyze";

  if (!rawUrl) return error(400, "missing_url", "Add the page to audit as ?url=example.com");
  const url = normalizeUrl(rawUrl);
  if (!url) return error(400, "invalid_url", "Enter a public http or https address, like example.com.");
  const apiPath = ENDPOINTS[endpoint];
  if (!apiPath) {
    return error(400, "invalid_endpoint", "endpoint must be analyze, quick-score or metadata.");
  }

  const bearer = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  const token = bearer || (req.headers.get("x-api-key") ?? "").trim();
  if (!token) {
    return error(401, "missing_key", "Send your key as Authorization: Bearer <key>.");
  }

  const keyHash = createHash("sha256").update(token).digest("hex");
  const { data: keyRow, error: keyError } = await supabase
    .from("api_keys")
    .select("id, user_id")
    .eq("key_hash", keyHash)
    .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
    .maybeSingle();
  if (keyError) return unavailable(`key lookup: ${keyError.message}`);
  if (!keyRow) return error(401, "invalid_key", "That API key is not valid. Create a new one in the dashboard.");

  const today = new Date().toISOString().slice(0, 10);
  const [{ data: user, error: userError }, { count, error: countError }] = await Promise.all([
    supabase
      .from("users")
      .select("plan")
      .eq("id", keyRow.user_id)
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
      .maybeSingle(),
    supabase
      .from("usage_logs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", keyRow.user_id)
      .gte("created_at", today)
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS)),
  ]);
  if (userError) return unavailable(`plan lookup: ${userError.message}`);
  if (countError || count === null) return unavailable(`usage count: ${countError?.message ?? "null"}`);

  const plan = user?.plan ?? "free";
  const limit = DAILY_LIMITS[plan] ?? DAILY_LIMITS.free;
  if (count >= limit) {
    const midnight = new Date();
    midnight.setUTCHours(24, 0, 0, 0);
    const retryAfter = Math.ceil((midnight.getTime() - Date.now()) / 1000);
    return error(
      429,
      "daily_limit",
      `Daily limit reached (${limit} a day on the ${plan} plan). It resets at 00:00 UTC.`,
      { "Retry-After": String(retryAfter) }
    );
  }

  // The row is written before the upstream call so requests in flight count toward the limit.
  const { data: usageRow, error: reserveError } = await supabase
    .from("usage_logs")
    .insert({ user_id: keyRow.user_id, key_id: keyRow.id, endpoint: apiPath, url, status: 0 })
    .select("id")
    .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
    .single();
  if (reserveError) return unavailable(`usage reserve: ${reserveError.message}`);

  const apiBase = process.env.SEO_API_BASE_URL;
  if (!apiBase) return unavailable("SEO_API_BASE_URL is not set");

  const start = Date.now();
  let upstream: Response | null = null;
  let result: Record<string, unknown> | null = null;
  try {
    upstream = await fetch(`${apiBase}${apiPath}?url=${encodeURIComponent(url)}`, {
      headers: process.env.SEO_API_KEY ? { "X-API-Key": process.env.SEO_API_KEY } : {},
      // Ends before maxDuration so after() always settles the reserved usage row.
      signal: AbortSignal.timeout(Math.max(1_000, 27_000 - (Date.now() - t0))),
      cache: "no-store",
    });
    result = await upstream.json();
  } catch {
    result = null;
  }
  const duration = Date.now() - start;

  // A 401 from the backend means our own service key is wrong, not the caller's.
  const ourFault = !upstream || !result || upstream.status === 401;
  after(async () => {
    if (ourFault) {
      await supabase.from("usage_logs").delete().eq("id", usageRow.id);
      return;
    }
    const score = typeof result?.seo_score === "number" ? Math.round(result.seo_score) : null;
    const [{ error: logError }, { error: keyUpdateError }] = await Promise.all([
      supabase
        .from("usage_logs")
        .update({ score, status: upstream!.status, duration_ms: duration })
        .eq("id", usageRow.id),
      supabase.from("api_keys").update({ last_used: new Date().toISOString() }).eq("id", keyRow.id),
    ]);
    if (logError) console.error(`usage update failed: ${logError.message}`);
    if (keyUpdateError) console.error(`last_used update failed: ${keyUpdateError.message}`);
  });

  if (!upstream || !result) {
    return error(504, "upstream_timeout", "The audit did not finish in time. Try again in a minute.");
  }
  if (upstream.status === 401) return unavailable("backend rejected SEO_API_KEY");
  return Response.json(result, { status: upstream.status });
}
