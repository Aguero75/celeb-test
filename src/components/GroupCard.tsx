"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";

export default function GroupCard({ group, joined, userId }: any) {
  const [isJoined, setIsJoined] = useState(joined);
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    setLoading(true);
    try {
      const res = await fetch("/api/groups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId: group.id }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setIsJoined(true);
      toast.success(`Joined ${group.name}!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to join group");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-6 card-hover flex flex-col gap-3">
      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
        <AnimatedIcon animationData={lordiconAssets.users} size={22} />
      </div>
      <div>
        <h3 className="font-semibold text-base">{group.name}</h3>
        <p className="text-white/50 text-sm mt-1">{group.description}</p>
      </div>
      <p className="text-xs text-white/30">
        {group.member_count?.toLocaleString()} members
      </p>
      {isJoined ? (
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
          <AnimatedIcon animationData={lordiconAssets.check} size={14} /> Joined
        </div>
      ) : (
        <button
          onClick={handleJoin}
          disabled={loading}
          className="gold-btn py-2 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <AnimatedIcon animationData={lordiconAssets.spark} size={14} />{" "}
              Joining...
            </>
          ) : (
            "Join Group"
          )}
        </button>
      )}
    </div>
  );
}
