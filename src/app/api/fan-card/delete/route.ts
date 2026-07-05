import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  if (
    user?.emailAddresses[0]?.emailAddress !==
    process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { cardId } = await req.json();

  const { error } = await supabaseAdmin
    .from("fan_cards")
    .delete()
    .eq("id", cardId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
