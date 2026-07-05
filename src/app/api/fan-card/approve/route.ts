import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { generateCardNumber } from "@/lib/utils";
import { addDays } from "date-fns";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (
    user?.emailAddresses[0]?.emailAddress !==
    process.env.NEXT_PUBLIC_ADMIN_EMAIL
  )
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { cardId } = await req.json();
  const cardNumber = generateCardNumber();
  const issuedAt = new Date();
  const expiresAt = addDays(issuedAt, 30);

  const { error } = await supabaseAdmin
    .from("fan_cards")
    .update({
      status: "approved",
      card_number: cardNumber,
      issued_at: issuedAt.toISOString(),
      expires_at: expiresAt.toISOString(),
    })
    .eq("id", cardId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
