import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="text-center">
        <div className="font-display text-2xl gold-text font-bold mb-8">
          ⭐ CelebFanHub
        </div>
        <SignIn />
      </div>
    </div>
  );
}
