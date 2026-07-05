import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // ✅ replaced getAuth with auth
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { userId } = await auth(); // ✅ await auth() instead of getAuth(req)
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { groupId } = await req.json();

  const { error } = await supabaseAdmin
    .from("group_memberships")
    .insert({ user_id: userId, group_id: groupId });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    await supabaseAdmin.rpc("increment_group_member", { gid: groupId });
  } catch {
    // ignore RPC failures so membership creation still succeeds
  }

  return NextResponse.json({ success: true });
}
