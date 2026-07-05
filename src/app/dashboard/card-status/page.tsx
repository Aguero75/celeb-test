import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isCardValid } from "@/lib/utils";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";

export default async function CardStatusPage() {
  const { userId } = await auth(); // ✅ add await
  const { data: cards } = await supabaseAdmin
    .from("fan_cards")
    .select("*")
    .eq("user_id", userId!)
    .order("created_at", { ascending: false });

  const latestCard = cards?.[0];

  const StatusIcon = ({
    status,
    expiresAt,
  }: {
    status: string;
    expiresAt: string | null;
  }) => {
    if (status === "approved" && isCardValid(expiresAt))
      return <AnimatedIcon animationData={lordiconAssets.check} size={48} />;
    if (status === "approved")
      return <AnimatedIcon animationData={lordiconAssets.spark} size={48} />;
    if (status === "pending")
      return <AnimatedIcon animationData={lordiconAssets.card} size={48} />;
    return <AnimatedIcon animationData={lordiconAssets.reject} size={48} />;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Card <span className="gold-text">Status</span>
      </h1>
      <p className="text-white/50 mb-8">
        Check the current state of your fan membership.
      </p>

      {!latestCard ? (
        <div className="glass rounded-2xl p-12 text-center">
          <AnimatedIcon
            animationData={lordiconAssets.card}
            size={48}
            className="mx-auto mb-4"
          />
          <p className="text-white/50 mb-4">
            You have not submitted a fan card yet.
          </p>
          <Link
            href="/dashboard/buy-card"
            className="gold-btn px-6 py-3 rounded-full text-sm inline-block"
          >
            Get Your Fan Card
          </Link>
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-center mb-6">
          <StatusIcon
            status={latestCard.status}
            expiresAt={latestCard.expires_at}
          />
          <p className="text-xl font-bold mt-4 mb-1">
            {latestCard.status === "approved" &&
            isCardValid(latestCard.expires_at)
              ? "Active Member"
              : latestCard.status === "approved"
                ? "Card Expired — Renew Now"
                : latestCard.status === "pending"
                  ? "Awaiting Admin Approval"
                  : "Card Rejected"}
          </p>
          {latestCard.card_number && (
            <p className="text-gold font-mono text-lg">
              #{latestCard.card_number}
            </p>
          )}
          {latestCard.expires_at && (
            <p className="text-white/40 text-sm mt-2">
              Expires: {format(new Date(latestCard.expires_at), "PPP")}
            </p>
          )}
          {latestCard.status === "pending" && (
            <p className="text-white/40 text-sm mt-2">
              Submitted {formatDistanceToNow(new Date(latestCard.created_at))}{" "}
              ago
            </p>
          )}
          {(latestCard.status === "rejected" ||
            !isCardValid(latestCard.expires_at)) && (
            <Link
              href="/dashboard/buy-card"
              className="gold-btn px-6 py-3 rounded-full text-sm inline-block mt-4"
            >
              Buy New Card
            </Link>
          )}
        </div>
      )}

      {cards && cards.length > 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Card History</h2>
          <div className="space-y-3">
            {cards.map((c) => (
              <div
                key={c.id}
                className="stat-card rounded-xl flex items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {c.card_number ? `#${c.card_number}` : "Pending card"}
                  </p>
                  <p className="text-xs text-white/40">
                    {format(new Date(c.created_at), "PPP")}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${c.status === "approved" ? "bg-green-500/20 text-green-400" : c.status === "pending" ? "bg-gold/20 text-gold" : "bg-red-500/20 text-red-400"}`}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
