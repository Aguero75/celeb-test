import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // ✅ changed
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { userId } = await auth(); // ✅ changed
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { eventId, userEmail, userName } = await req.json();

  const { data: existing } = await supabaseAdmin
    .from("event_bookings")
    .select("id")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .single();
  if (existing)
    return NextResponse.json({ error: "Already booked" }, { status: 409 });

  const { error } = await supabaseAdmin.from("event_bookings").insert({
    user_id: userId,
    user_email: userEmail,
    user_name: userName,
    event_id: eventId,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
