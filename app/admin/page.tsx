import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardStats, DashboardUpdates } from "./DashboardComponents";
import { PageHeader, DashboardContainer } from "@/components/ui/dashboard-ui";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const dynamic = "force-dynamic";

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
        <div className="flex h-32 w-full items-center justify-center bg-white border border-slate-200 rounded-3xl mb-10 shadow-sm">
          <LoadingSpinner size="md" label="Calculating stats..." />
        </div>
      }>
        <DashboardStats />
      </Suspense>

      <Suspense fallback={
        <div className="flex h-96 w-full items-center justify-center bg-white border border-slate-200 rounded-3xl shadow-sm">
          <LoadingSpinner size="lg" label="Fetching latest updates..." />
        </div>
      }>
        <DashboardUpdates />
      </Suspense>
    </DashboardContainer>
  );
}
