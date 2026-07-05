import { supabaseAdmin } from "@/lib/supabase";
import AdminFanCardList from "@/components/AdminFanCardList";

export default async function AdminFanCardsPage() {
  const { data: cards } = await supabaseAdmin
    .from("fan_cards")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Fan Card <span className="gold-text">Submissions</span>
      </h1>
      <AdminFanCardList cards={cards ?? []} />
    </div>
  );
}
