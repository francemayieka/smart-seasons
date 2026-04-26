import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AgentDashboardStats, AgentRecentUpdates } from "./DashboardComponents";

export default async function AgentDashboard() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "AGENT") redirect("/");
  if (!session?.user?.id) return null;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agent Overview</h1>
        <p className="mt-2 text-slate-600">Track your assigned fields and record critical crop observations.</p>
      </div>

      <Suspense fallback={
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white border border-slate-200 rounded-3xl" />)}
        </div>
      }>
        <AgentDashboardStats agentId={session.user.id} />
      </Suspense>

      <Suspense fallback={
        <div className="w-full animate-pulse">
          <div className="h-96 bg-white border border-slate-200 rounded-3xl" />
        </div>
      }>
        <AgentRecentUpdates agentId={session.user.id} />
      </Suspense>
    </div>
  );
}
