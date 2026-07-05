"use client";
import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader({
  user,
}: {
  user: { name: string; email: string };
}) {
  return (
    <header className="h-16 border-b border-gold/10 px-6 flex items-center justify-between bg-obsidian-mid">
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-white/40">{user.email}</p>
      </div>
      <UserButton />
    </header>
  );
}
