import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AgentDashboardStats, AgentRecentUpdates } from "./DashboardComponents";
import { DashboardContainer, PageHeader } from "@/components/ui/dashboard-ui";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const dynamic = "force-dynamic";

export default async function AgentDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "AGENT") redirect("/");
  if (!session?.user?.id) return null;

  return (
    <DashboardContainer>
      <PageHeader 
        title="Agent Overview" 
        description="Track your assigned fields and record critical crop observations."
      />

      <Suspense fallback={
        <div className="flex h-32 w-full items-center justify-center bg-white border border-slate-200 rounded-3xl mb-10 shadow-sm">
          <LoadingSpinner size="md" label="Analyzing your fields..." />
        </div>
      }>
        <AgentDashboardStats agentId={session.user.id} />
      </Suspense>

      <Suspense fallback={
        <div className="flex h-96 w-full items-center justify-center bg-white border border-slate-200 rounded-3xl shadow-sm">
          <LoadingSpinner size="lg" label="Retrieving latest records..." />
        </div>
      }>
        <AgentRecentUpdates agentId={session.user.id} />
      </Suspense>
    </DashboardContainer>
  );
}
