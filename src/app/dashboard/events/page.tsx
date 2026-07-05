import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import EventCard from "@/components/EventCard";

export default async function EventsPage() {
  const { userId } = await auth(); // ✅ fix
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const { data: events } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  const { data: bookings } = await supabaseAdmin
    .from("event_bookings")
    .select("event_id")
    .eq("user_id", userId!);
  const bookedIds = new Set(bookings?.map((b) => b.event_id));

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Upcoming <span className="gold-text">Events</span>
      </h1>
      <p className="text-white/50 mb-8">
        Book your spot at exclusive fan events. Spots are very limited.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            booked={bookedIds.has(event.id)}
            userId={userId!}
            userEmail={email!}
            userName={name}
          />
        ))}
      </div>
      {(!events || events.length === 0) && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white/40">
            No events scheduled yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
