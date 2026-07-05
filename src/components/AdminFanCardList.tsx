"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";

export default function AdminFanCardList({ cards: initial }: { cards: any[] }) {
  const [cards, setCards] = useState(initial);
  const [loading, setLoading] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function approve(id: string) {
    setLoading(id + "-approve");
    const res = await fetch("/api/fan-card/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: id }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setCards((c) =>
        c.map((x) => (x.id === id ? { ...x, status: "approved" } : x)),
      );
      toast.success("Card approved!");
    } else toast.error(data.error || "Failed to approve card");
    setLoading(null);
  }

  async function reject(id: string) {
    setLoading(id + "-reject");
    const res = await fetch("/api/fan-card/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: id }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setCards((c) =>
        c.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)),
      );
      toast.success("Card rejected.");
    } else toast.error(data.error || "Failed to reject card");
    setLoading(null);
  }

  async function deleteCard(id: string) {
    if (!confirm("Delete this fan card submission?")) return;
    setLoading(id + "-delete");
    const res = await fetch("/api/fan-card/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: id }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setCards((c) => c.filter((x) => x.id !== id));
      toast.success("Deleted.");
    } else toast.error(data.error || "Failed to delete card");
    setLoading(null);
  }

  return (
    <div>
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="Gift card"
            className="max-w-lg max-h-screen rounded-2xl object-contain"
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left py-3 pr-4">Fan</th>
              <th className="text-left py-3 pr-4">Gift Card #</th>
              <th className="text-left py-3 pr-4">Image</th>
              <th className="text-left py-3 pr-4">Submitted</th>
              <th className="text-left py-3 pr-4">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cards.map((card) => (
              <tr key={card.id} className="hover:bg-white/2 transition-colors">
                <td className="py-4 pr-4">
                  <p className="font-medium">{card.user_name}</p>
                  <p className="text-white/40 text-xs">{card.user_email}</p>
                </td>
                <td className="py-4 pr-4 font-mono text-xs text-white/70">
                  {card.gift_card_number}
                </td>
                <td className="py-4 pr-4">
                  <button
                    onClick={() => setPreview(card.gift_card_image_url)}
                    className="flex items-center gap-1 text-gold hover:text-gold-light text-xs"
                  >
                    <AnimatedIcon
                      animationData={lordiconAssets.eye}
                      size={14}
                    />{" "}
                    View
                  </button>
                </td>
                <td className="py-4 pr-4 text-white/40 text-xs">
                  {format(new Date(card.created_at), "PP")}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${card.status === "approved" ? "bg-green-500/20 text-green-400" : card.status === "pending" ? "bg-gold/20 text-gold" : "bg-red-500/20 text-red-400"}`}
                  >
                    {card.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    {card.status === "pending" && (
                      <>
                        <button
                          onClick={() => approve(card.id)}
                          disabled={!!loading}
                          className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                        >
                          {loading === card.id + "-approve" ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <AnimatedIcon
                              animationData={lordiconAssets.check}
                              size={14}
                            />
                          )}
                        </button>
                        <button
                          onClick={() => reject(card.id)}
                          disabled={!!loading}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          {loading === card.id + "-reject" ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <AnimatedIcon
                              animationData={lordiconAssets.reject}
                              size={14}
                            />
                          )}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteCard(card.id)}
                      disabled={!!loading}
                      className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                      {loading === card.id + "-delete" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <AnimatedIcon
                          animationData={lordiconAssets.delete}
                          size={14}
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cards.length === 0 && (
          <p className="text-white/30 text-center py-12">No submissions yet.</p>
        )}
      </div>
    </div>
  );
}
