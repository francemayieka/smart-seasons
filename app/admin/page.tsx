import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardStats, DashboardUpdates } from "./DashboardComponents";
import { PageHeader, DashboardContainer } from "@/components/ui/dashboard-ui";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  return (
    <DashboardContainer>
      <PageHeader 
        title="Dashboard Overview" 
        description="Monitor all fields, review agent performance, and validate field status."
      />

      <Suspense fallback={
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white border border-slate-200 rounded-3xl" />)}
        </div>
      }>
        <DashboardStats />
      </Suspense>

      <Suspense fallback={
        <div className="w-full animate-pulse">
          <div className="h-96 bg-white border border-slate-200 rounded-3xl" />
        </div>
      }>
        <DashboardUpdates />
      </Suspense>
    </DashboardContainer>
  );
}
