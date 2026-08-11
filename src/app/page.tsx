import Link from "next/link";
import NavBar from "@/components/Navbar";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { lordiconAssets } from "@/lib/lottie/lordiconAssets";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-obsidian text-white overflow-hidden">
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-linear-to-b from-obsidian via-obsidian-mid to-obsidian-soft" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.2), transparent), radial-gradient(circle at 20% 80%, rgba(168,85,247,0.1), transparent 50%)",
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-gold mb-6 sm:mb-8 animate-pulse-gold">
            <AnimatedIcon
              animationData={lordiconAssets.spark}
              size={14}
              className="text-gold"
            />
            <span className="font-body font-semibold">
              OFFICIAL FAN PORTAL — LIMITED ACCESS
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
            <span className="gold-text">The Closest</span>
            <br />
            <span className="text-white">You Can Get</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-body">
            Join thousands of fans with exclusive access to events, premium
            content, verified fan cards, and direct community connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/sign-up"
              className="gold-btn px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Get Your Fan Card
              <AnimatedIcon animationData={lordiconAssets.card} size={18} />
            </Link>
            <Link
              href="/sign-in"
              className="glass px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2 hover:border-gold/40 transition-all duration-300 font-body font-semibold"
            >
              <AnimatedIcon animationData={lordiconAssets.spark} size={16} />
              Already a fan? Sign in
            </Link>
          </div>
        </div>
        <div className="absolute top-1/4 left-5 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gold/5 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-purple-500/5 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              ["50K+", "Active Fans"],
              ["200+", "Events Hosted"],
              ["98%", "Member Satisfaction"],
              ["24/7", "Fan Support"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl gold-text font-bold mb-1">
                  {num}
                </div>
                <div className="text-white/50 text-xs sm:text-sm font-body">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Fan <span className="gold-text">Benefits</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base font-body">
              Everything a true fan deserves, unlocked when you get your card.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: "crown",
                title: "Verified Fan Card",
                desc: "A digital membership card proving you are part of the official inner circle. Valid for 30 days and renewable.",
              },
              {
                icon: "spark",
                title: "Exclusive Events",
                desc: "Book seats at VIP concerts, meet-and-greets, listening parties, and more before they open to the public.",
              },
              {
                icon: "users",
                title: "Premium Social Groups",
                desc: "Join private fan communities with direct feeds, polls, and group chats unavailable to the general public.",
              },
              {
                icon: "shield",
                title: "Verified Identity",
                desc: "Your fan card is admin-verified for authenticity. No fakes, no bots. Only real fans in this space.",
              },
              {
                icon: "star",
                title: "Early Access",
                desc: "Get early drops, announcements, and content weeks before they go public. Be first, always.",
              },
              {
                icon: "spark",
                title: "Merch Discounts",
                desc: "Fan card holders get exclusive discount codes on official merch and collaborations.",
              },
            ].map((item) => {
              const { icon, title, desc } = item;
              const iconAsset =
                lordiconAssets[icon as keyof typeof lordiconAssets] ??
                lordiconAssets.spark;

              return (
                <div
                  key={title}
                  className="group glass rounded-2xl p-5 sm:p-6 card-hover gradient-card relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-gold/5 to-purple-500/5 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                      <AnimatedIcon animationData={iconAsset} size={24} />
                    </div>
                    <h3 className="font-display font-semibold text-base sm:text-lg mb-2">
                      {title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-body">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-obsidian-soft to-obsidian-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              How It <span className="gold-text">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "Sign up in seconds using your email. No complicated setup.",
              },
              {
                step: "02",
                title: "Purchase Your Fan Card",
                desc: "Pay using a gift card — enter the number and upload an image for verification.",
              },
              {
                step: "03",
                title: "Get Verified & Access Everything",
                desc: "Admin approves your card within 24 hours. Your 30-day membership begins immediately.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative group">
                <div className="font-display text-5xl sm:text-6xl font-bold gold-text opacity-15 group-hover:opacity-25 mb-2 sm:mb-4 transition-opacity">
                  {step}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3 -mt-2 sm:-mt-6">
                  {title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-body">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass rounded-3xl p-8 sm:p-12 gradient-card">
            <AnimatedIcon
              animationData={lordiconAssets.crown}
              size={40}
              className="mx-auto mb-4 sm:mb-6"
            />
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Ready to <span className="gold-text">Join?</span>
            </h2>
            <p className="text-white/50 mb-6 sm:mb-8 text-sm sm:text-base font-body">
              Spots are limited. Secure your fan card before this wave sells
              out.
            </p>
            <Link
              href="/sign-up"
              className="gold-btn px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base inline-flex items-center gap-2"
            >
              Become a Member
              <AnimatedIcon animationData={lordiconAssets.star} size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 py-8 bg-gradient-to-t from-obsidian-mid to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="font-display gold-text font-bold text-lg">
            ⭐ CelebFanHub
          </span>
          <p className="text-white/30 text-xs sm:text-sm font-body">
            © {new Date().getFullYear()} CelebFanHub. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
