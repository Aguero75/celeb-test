"use client";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg sm:text-xl gold-text font-bold tracking-wider hover:scale-105 transition-transform"
        >
          ⭐ CelebFanHub
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {!isSignedIn ? (
            <>
              <Link
                href="/sign-in"
                className="hidden sm:block text-sm text-white/70 hover:text-gold transition-colors duration-200 font-body"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="gold-btn px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm"
              >
                Join
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:block gold-btn px-5 py-2 rounded-full text-sm"
              >
                Dashboard
              </Link>
              <div className="scale-90 sm:scale-100 origin-right">
                <UserButton />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
