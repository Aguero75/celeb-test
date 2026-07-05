import { auth, currentUser } from "@clerk/nextjs/server"; // ✅ replaced getAuth with auth
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { userId } = await auth(); // ✅ await auth() instead of getAuth(req)
  const user = await currentUser();
  if (!userId || !user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const giftCardNumber = formData.get("giftCardNumber") as string;
  const giftCardImage = formData.get("giftCardImage") as File;

  if (!giftCardNumber || !giftCardImage)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const { data: existing } = await supabaseAdmin
    .from("fan_cards")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "pending")
    .single();
  if (existing)
    return NextResponse.json(
      { error: "You already have a pending fan card request." },
      { status: 409 },
    );

  const arrayBuffer = await giftCardImage.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${userId}-${Date.now()}.${giftCardImage.name.split(".").pop()}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("gift-cards")
    .upload(fileName, buffer, {
      contentType: giftCardImage.type,
      upsert: false,
    });

  if (uploadError)
    return NextResponse.json(
      { error: "Image upload failed: " + uploadError.message },
      { status: 500 },
    );

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("gift-cards").getPublicUrl(fileName);

  const email = user.emailAddresses[0]?.emailAddress;
  const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  const { error } = await supabaseAdmin.from("fan_cards").insert({
    user_id: userId,
    user_email: email,
    user_name: name,
    gift_card_number: giftCardNumber,
    gift_card_image_url: publicUrl,
    status: "pending",
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
