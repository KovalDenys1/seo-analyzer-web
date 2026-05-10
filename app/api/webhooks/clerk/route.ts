import { headers } from "next/headers";
import { Webhook } from "svix";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook secret not configured", { status: 500 });

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(secret);

  let event: { type: string; data: Record<string, unknown> };
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof event;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    const d = event.data;
    const emails = d.email_addresses as Array<{ email_address: string; id: string }>;
    const primaryId = d.primary_email_address_id as string;
    const email = emails.find((e) => e.id === primaryId)?.email_address ?? emails[0]?.email_address;

    await supabase.from("users").upsert({
      id: d.id as string,
      email,
      name: [d.first_name, d.last_name].filter(Boolean).join(" ") || null,
      plan: "free",
    });
  }

  if (event.type === "user.deleted") {
    await supabase.from("users").delete().eq("id", event.data.id as string);
  }

  return new Response("OK");
}
