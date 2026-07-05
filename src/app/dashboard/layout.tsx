import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth(); // ✅ fixed
  if (!userId) redirect("/sign-in");
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-obsidian flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader
          user={{
            name: user?.firstName || "Fan",
            email: user?.emailAddresses[0]?.emailAddress || "",
          }}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
