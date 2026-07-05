"use client";
import { useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";

export default function EventCard({
  event,
  booked,
  userId,
  userEmail,
  userName,
}: any) {
  const [isBooked, setIsBooked] = useState(booked);
  const [loading, setLoading] = useState(false);

  async function handleBook() {
    setLoading(true);
    try {
      const res = await fetch("/api/events/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, userEmail, userName }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setIsBooked(true);
      toast.success("Event booked successfully!");
    } catch (err: any) {
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-6 card-hover flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-white/50 text-sm">{event.description}</p>
      </div>
      <div className="space-y-2 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <AnimatedIcon animationData={lordiconAssets.calendar} size={14} />
          {format(new Date(event.date), "PPP p")}
        </div>
        <div className="flex items-center gap-2">
          <AnimatedIcon animationData={lordiconAssets.spark} size={14} />
          {event.location}
        </div>
        <div className="flex items-center gap-2">
          <AnimatedIcon animationData={lordiconAssets.card} size={14} />₦
          {event.price?.toLocaleString()}
        </div>
      </div>
      {isBooked ? (
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
          <AnimatedIcon animationData={lordiconAssets.check} size={16} /> Booked
        </div>
      ) : (
        <button
          onClick={handleBook}
          disabled={loading}
          className="gold-btn py-2 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <AnimatedIcon animationData={lordiconAssets.spark} size={14} />{" "}
              Booking...
            </>
          ) : (
            "Book Now"
          )}
        </button>
      )}
    </div>
  );
}
