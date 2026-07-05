import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";

export default async function AdminPage() {
  const { count: fanCount } = await supabaseAdmin
    .from("fan_cards")
    .select("*", { count: "exact", head: true });
  const { count: pendingCount } = await supabaseAdmin
    .from("fan_cards")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");
  const { count: approvedCount } = await supabaseAdmin
    .from("fan_cards")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin <span className="gold-text">Dashboard</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          ["Total Submissions", fanCount ?? 0, "text-blue-400"],
          ["Pending Approval", pendingCount ?? 0, "text-gold"],
          ["Approved Cards", approvedCount ?? 0, "text-green-400"],
        ].map(([label, val, color]) => (
          <div key={String(label)} className="stat-card rounded-xl text-center">
            <p className={`text-3xl font-bold ${color}`}>{val}</p>
            <p className="text-white/40 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/fan-cards"
          className="glass rounded-xl p-6 flex items-center gap-4 card-hover"
        >
          <AnimatedIcon animationData={lordiconAssets.card} size={24} />
          <div>
            <p className="font-semibold">Manage Fan Cards</p>
            <p className="text-white/40 text-xs">
              Review, approve, and reject submissions
            </p>
          </div>
        </Link>
        <Link
          href="/admin/fans"
          className="glass rounded-xl p-6 flex items-center gap-4 card-hover"
        >
          <AnimatedIcon animationData={lordiconAssets.users} size={24} />
          <div>
            <p className="font-semibold">Registered Fans</p>
            <p className="text-white/40 text-xs">View and manage all users</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
