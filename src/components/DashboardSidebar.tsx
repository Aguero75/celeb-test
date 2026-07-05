"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";
import { SignOutButton } from "@clerk/nextjs";

const links = [
  { href: "/dashboard", label: "Overview", iconKey: "spark" },
  { href: "/dashboard/buy-card", label: "Buy Fan Card", iconKey: "card" },
  { href: "/dashboard/events", label: "Book Event", iconKey: "calendar" },
  { href: "/dashboard/groups", label: "Premium Groups", iconKey: "users" },
  { href: "/dashboard/card-status", label: "Card Status", iconKey: "check" },
  { href: "/dashboard/merch", label: "Fan Merch", iconKey: "spark" },
];

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 glass p-2 rounded-lg"
      >
        {open ? (
          <AnimatedIcon animationData={lordiconAssets.reject} size={20} />
        ) : (
          <AnimatedIcon animationData={lordiconAssets.spark} size={20} />
        )}
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen z-40 w-64 glass border-r border-gold/10 flex flex-col transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 border-b border-gold/10 bg-gradient-to-br from-gold/5 to-transparent">
          <Link
            href="/"
            className="font-display text-xl gold-text font-bold tracking-wide hover:scale-105 transition-transform"
          >
            ⭐ CelebFanHub
          </Link>
          <p className="text-white/30 text-xs mt-1 font-body">Fan Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map(({ href, label, iconKey }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`sidebar-link group ${pathname === href ? "active" : ""}`}
            >
              <AnimatedIcon
                animationData={
                  lordiconAssets[iconKey as keyof typeof lordiconAssets]
                }
                size={18}
              />
              <span className="font-body text-sm">{label}</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-gold opacity-0 group-active:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gold/10 bg-gradient-to-t from-gold/3 to-transparent">
          <SignOutButton>
            <button className="sidebar-link w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 group">
              <AnimatedIcon animationData={lordiconAssets.crown} size={18} />
              <span className="font-body text-sm">Sign Out</span>
            </button>
          </SignOutButton>
        </div>
      </aside>
    </>
  );
}
