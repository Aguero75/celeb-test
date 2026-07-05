import { supabaseAdmin } from "@/lib/supabase";
import AdminFansList from "@/components/AdminFansList";

export default async function AdminFansPage() {
  const { data: fans } = await supabaseAdmin
    .from("fan_cards")
    .select("user_id, user_email, user_name, created_at, status")
    .order("created_at", { ascending: false });

  const uniqueFans = Object.values(
    (fans ?? []).reduce((acc: Record<string, any>, f) => {
      if (!acc[f.user_id]) acc[f.user_id] = f;
      return acc;
    }, {}),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        All <span className="gold-text">Registered Fans</span>
      </h1>
      <AdminFansList fans={uniqueFans} />
    </div>
  );
}
