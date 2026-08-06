import { createHash } from "crypto";
import { supabase } from "@/lib/supabase";

const DAILY_LIMITS: Record<string, number> = {
  free: 100,
  pro: 5000,
  business: 50000,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const endpoint = searchParams.get("endpoint") ?? "analyze";

  if (!url) return Response.json({ error: "url param required" }, { status: 400 });

  // Auth via Bearer token
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) return Response.json({ error: "API key required" }, { status: 401 });

  // Look up key
  const keyHash = createHash("sha256").update(token).digest("hex");
  const { data: keyRow } = await supabase
    .from("api_keys")
    .select("id, user_id")
    .eq("key_hash", keyHash)
    .single();

  if (!keyRow) return Response.json({ error: "Invalid API key" }, { status: 401 });

  // Check plan + daily usage
  const { data: user } = await supabase
    .from("users")
    .select("plan")
    .eq("id", keyRow.user_id)
    .single();

  const plan = user?.plan ?? "free";
  const limit = DAILY_LIMITS[plan];

  const { count } = await supabase
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", keyRow.user_id)
    .gte("created_at", new Date().toISOString().slice(0, 10)); // today

  if ((count ?? 0) >= limit) {
    return Response.json(
      { error: `Daily limit reached (${limit} req/day on ${plan} plan)` },
      { status: 429 }
    );
  }

  // Proxy to Render API
  const apiBase = process.env.SEO_API_BASE_URL!;
  const apiPath = endpoint === "quick-score" ? "/quick-score" : endpoint === "metadata" ? "/metadata" : "/analyze";
  const start = Date.now();

  const upstream = await fetch(`${apiBase}${apiPath}?url=${encodeURIComponent(url)}`);
  const duration = Date.now() - start;
  const result = await upstream.json();

  // Log usage
  await supabase.from("usage_logs").insert({
    user_id: keyRow.user_id,
    key_id: keyRow.id,
    endpoint: apiPath,
    url,
    score: result?.seo_score ?? null,
    status: upstream.status,
    duration_ms: duration,
  });

  // Update key last_used
  await supabase.from("api_keys").update({ last_used: new Date().toISOString() }).eq("id", keyRow.id);

  return Response.json(result, { status: upstream.status });
}
