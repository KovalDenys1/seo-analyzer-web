import { auth } from "@clerk/nextjs/server";
import { createHash, randomBytes } from "crypto";
import { supabase } from "@/lib/supabase";
import { ensureUser } from "@/lib/ensure-user";

function generateKey(): { key: string; prefix: string; hash: string } {
  const raw = `sk_live_${randomBytes(24).toString("hex")}`;
  const prefix = raw.slice(0, 16);
  const hash = createHash("sha256").update(raw).digest("hex");
  return { key: raw, prefix, hash };
}

// GET /api/keys — list keys for current user
export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("api_keys")
    .select("id, key_prefix, name, created_at, last_used")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

// POST /api/keys — create a new key
export async function POST() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await ensureUser();

  const { key, prefix, hash } = generateKey();

  const { data, error } = await supabase
    .from("api_keys")
    .insert({ user_id: userId, key_hash: hash, key_prefix: prefix, name: "Default" })
    .select("id, key_prefix, name, created_at")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  // Return full key only once
  return Response.json({ ...data, key });
}
