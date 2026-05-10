import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "./supabase";

export async function ensureUser() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const email =
    clerk.emailAddresses.find((e) => e.id === clerk.primaryEmailAddressId)
      ?.emailAddress ?? clerk.emailAddresses[0]?.emailAddress;

  const name = [clerk.firstName, clerk.lastName].filter(Boolean).join(" ") || null;

  const { data, error } = await supabase
    .from("users")
    .upsert({ id: clerk.id, email, name, plan: "free" }, { onConflict: "id", ignoreDuplicates: true })
    .select()
    .single();

  if (error) {
    // User already exists — fetch them
    const { data: existing } = await supabase
      .from("users")
      .select()
      .eq("id", clerk.id)
      .single();
    return existing;
  }

  return data;
}
