import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email || email !== adminEmail) redirect("/dashboard");
  return (
    <div className="min-h-screen bg-obsidian">
      <div className="bg-obsidian-mid border-b border-gold/20 px-8 py-4 flex items-center justify-between">
        <span className="font-display gold-text font-bold text-lg">
          ⭐ Admin Panel
        </span>
        <span className="text-white/40 text-xs">{email}</span>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8">{children}</div>
    </div>
  );
}
