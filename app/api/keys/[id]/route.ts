import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// DELETE /api/keys/[id]
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id)
    .eq("user_id", userId); // ensure ownership

  if (error) {
    console.error(`key delete failed: ${error.message}`);
    return Response.json({ error: "Could not delete the key." }, { status: 500 });
  }
  return Response.json({ ok: true });
}
