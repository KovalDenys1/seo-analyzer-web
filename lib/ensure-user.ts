import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "./supabase";

export async function ensureUser() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const email =
    clerk.emailAddresses.find((e) => e.id === clerk.primaryEmailAddressId)
      ?.emailAddress ?? clerk.emailAddresses[0]?.emailAddress;

  const name = [clerk.firstName, clerk.lastName].filter(Boolean).join(" ") || null;

  const { error: upsertError } = await supabase
    .from("users")
    .upsert(
      { id: clerk.id, email: email ?? null, name, plan: "free" },
      { onConflict: "id", ignoreDuplicates: true }
    );
  if (upsertError) throw new Error(`user upsert failed: ${upsertError.message}`);

  const { data, error } = await supabase.from("users").select().eq("id", clerk.id).maybeSingle();
  if (error || !data) throw new Error(`user lookup failed: ${error?.message ?? "no row"}`);
  return data as { id: string; email: string | null; name: string | null; plan: string; created_at: string };
}
