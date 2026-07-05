import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import GroupCard from "@/components/GroupCard";

export default async function GroupsPage() {
  const { userId } = await auth(); // ✅ fix
  const { data: groups } = await supabaseAdmin
    .from("premium_groups")
    .select("*")
    .order("member_count", { ascending: false });
  const { data: memberships } = await supabaseAdmin
    .from("group_memberships")
    .select("group_id")
    .eq("user_id", userId!);
  const joinedIds = new Set(memberships?.map((m) => m.group_id));

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Premium <span className="gold-text">Social Groups</span>
      </h1>
      <p className="text-white/50 mb-8">
        Exclusive communities for verified fan card holders.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            joined={joinedIds.has(group.id)}
            userId={userId!}
          />
        ))}
      </div>
    </div>
  );
}
