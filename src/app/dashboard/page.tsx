import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isCardValid } from "@/lib/utils";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const { data: card } = await supabaseAdmin
    .from("fan_cards")
    .select("*")
    .eq("user_id", userId!)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const cardActive =
    card?.status === "approved" && isCardValid(card?.expires_at);

  const quickLinks = [
    {
      href: "/dashboard/buy-card",
      iconKey: "card",
      label: "Buy Fan Card",
      desc: "Get verified membership",
      gradient: "from-gold-light to-gold",
    },
    {
      href: "/dashboard/events",
      iconKey: "calendar",
      label: "Book Event",
      desc: "Secure your seat",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      href: "/dashboard/groups",
      iconKey: "users",
      label: "Premium Groups",
      desc: "Join the circle",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      href: "/dashboard/card-status",
      iconKey: "spark",
      label: "Card Status",
      desc: "Check membership",
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-8 pt-4">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-2">
          Welcome back,{" "}
          <span className="gold-text">{user?.firstName || "Fan"}</span> 👋
        </h1>
        <p className="text-white/50 font-body text-sm sm:text-base">
          Here's what's happening with your fan membership.
        </p>
      </div>

      <div
        className={`rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 gradient-card ${
          cardActive
            ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20"
            : "bg-gradient-to-br from-gold-light/10 to-gold/5 border border-gold/20"
        }`}
      >
        <div className="flex-shrink-0">
          <AnimatedIcon
            animationData={lordiconAssets.crown}
            size={32}
            className={cardActive ? "text-emerald-400" : "text-gold"}
          />
        </div>
        <div className="flex-1">
          <p className="font-display font-semibold text-base sm:text-lg">
            {cardActive
              ? `Active Member · Card #${card?.card_number}`
              : card?.status === "pending"
                ? "Fan card pending admin approval"
                : "No active fan card"}
          </p>
          <p className="text-sm text-white/50 font-body mt-1">
            {cardActive
              ? `Expires: ${new Date(card.expires_at).toLocaleDateString()}`
              : "Purchase a fan card to unlock all features"}
          </p>
        </div>
        {!cardActive && (
          <Link
            href="/dashboard/buy-card"
            className="gold-btn px-6 py-2 rounded-full text-sm font-semibold flex-shrink-0 w-full sm:w-auto text-center"
          >
            Get Card
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map(({ href, iconKey, label, desc, gradient }) => (
          <Link
            key={href}
            href={href}
            className="stat-card group gradient-card relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${gradient} transition-opacity duration-300`}
            />
            <div className="relative z-10">
              <div className="mb-4">
                <AnimatedIcon
                  animationData={
                    lordiconAssets[iconKey as keyof typeof lordiconAssets]
                  }
                  size={28}
                />
              </div>
              <p className="font-display font-semibold text-sm sm:text-base mb-1">
                {label}
              </p>
              <p className="text-white/40 text-xs font-body">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
