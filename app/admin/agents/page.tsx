import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminAgentItem } from "./AdminAgentItem";
import Link from "next/link";
import { getAdminAgents } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";
import { PageHeader, DashboardContainer, HybridGrid } from "@/components/ui/dashboard-ui";

export default async function AdminAgentsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  const params = await searchParams;
  const statusFilter = params.status || "pending"; 

  const agents = await getAdminAgents(statusFilter);

  return (
    <DashboardContainer>
      <PageHeader 
        title="Agents" 
        description="Manage field agents, view their assignments, and update their status."
        action={{ label: "Add Agent", href: "/admin/agents/new" }}
      />

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-nowrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit max-w-full overflow-x-auto no-scrollbar">
        {["pending", "active", "former"].map((status) => (
          <SmartPrefetch key={status} type="agents" className="contents">
            <Link
              href={`?status=${status}`}
              className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition whitespace-nowrap ${
                statusFilter === status
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {status}
            </Link>
          </SmartPrefetch>
        ))}
      </div>

      <HybridGrid>
        {agents.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No agents found for this status.
          </div>
        ) : (
          agents.map((agent) => (
            <AdminAgentItem key={agent.id} agent={agent as any} />
          ))
        )}
      </HybridGrid>
    </DashboardContainer>
  );
}
