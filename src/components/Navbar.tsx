"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  const { isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg sm:text-xl gold-text font-bold tracking-wider hover:scale-105 transition-transform"
        >
          ⭐ CelebFanHub
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm text-white/70 hover:text-gold transition-colors duration-200 font-body"
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
                  className="gold-btn px-5 py-2 rounded-full text-sm"
                >
                  Dashboard
                </Link>
                <div className="scale-90 sm:scale-100 origin-right">
                  <UserButton />
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="sm:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/90 hover:bg-white/10 transition"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-200 ${mobileOpen ? "max-h-40" : "max-h-0"}`}
      >
        <div className="px-4 pb-4 flex flex-col gap-3">
          {!isSignedIn ? (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-white/70 hover:text-gold transition-colors duration-200 font-body"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="gold-btn px-4 py-2 rounded-full text-sm text-center w-full"
                onClick={() => setMobileOpen(false)}
              >
                Join
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="gold-btn px-4 py-2 rounded-full text-sm text-center w-full"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <div className="w-full rounded-full border border-white/10 bg-white/5 p-1">
                <UserButton />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
