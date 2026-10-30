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

  if (error) {
    console.error(`keys list failed: ${error.message}`);
    return Response.json({ error: "Could not load keys." }, { status: 500 });
  }
  return Response.json(data);
}

// POST /api/keys — create a new key and retire the user's older ones
export async function POST() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensureUser();
  } catch (err) {
    console.error(`ensureUser failed: ${(err as Error).message}`);
    return Response.json({ error: "Could not create the key." }, { status: 500 });
  }

  const { key, prefix, hash } = generateKey();

  const { data, error } = await supabase
    .from("api_keys")
    .insert({ user_id: userId, key_hash: hash, key_prefix: prefix, name: "Default" })
    .select("id, key_prefix, name, created_at")
    .single();

  if (error) {
    console.error(`key insert failed: ${error.message}`);
    return Response.json({ error: "Could not create the key." }, { status: 500 });
  }

  const { error: cleanupError } = await supabase
    .from("api_keys")
    .delete()
    .eq("user_id", userId)
    .lt("created_at", data.created_at);
  if (cleanupError) console.error(`old key cleanup failed: ${cleanupError.message}`);

  // Return full key only once
  return Response.json({ ...data, key });
}
