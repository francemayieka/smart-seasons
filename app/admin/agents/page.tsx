import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminAgentItem } from "./AdminAgentItem";
import Link from "next/link";
import { getAdminAgents } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";
import { PageHeader, DashboardContainer, HybridGrid } from "@/components/ui/dashboard-ui";
import { SearchBar } from "@/components/ui/search-bar";

export const dynamic = "force-dynamic";

export default async function AdminAgentsPage({ searchParams }: { searchParams: Promise<{ status?: string, q?: string }> }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  const params = await searchParams;
  const statusFilter = params.status || "active"; 
  const q = params.q;

  const [agents, unassignedFields, activeAgents] = await Promise.all([
    getAdminAgents(statusFilter, q),
    prisma.field.findMany({ where: { agentId: null }, select: { id: true, name: true } }),
    getAdminAgents("ACTIVE")
  ]);

  const unassignedOptions = unassignedFields.map(f => ({ id: f.id, name: f.name }));
  const agentOptions = activeAgents.map(a => ({ id: a.id, name: a.name }));

  return (
    <DashboardContainer>
      <PageHeader 
        title="Agents" 
        description="Manage field agents, view their assignments, and update their status."
        action={{ label: "Add Agent", href: "/admin/agents/new" }}
      />

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-nowrap gap-1 md:gap-4 p-1 bg-slate-100/50 rounded-2xl w-full lg:w-fit overflow-x-auto no-scrollbar shadow-inner border border-slate-200/50">
          {["active", "pending", "former"].map((status) => (
            <SmartPrefetch key={status} type="agents" className="contents">
              <Link
                href={status === "active" ? "/admin/agents" : `/admin/agents?status=${status}`}
                className={`flex-1 md:flex-none px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap capitalize text-center ${
                  (statusFilter === status || (!statusFilter && status === "active"))
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {status}
              </Link>
            </SmartPrefetch>
          ))}
        </div>
        <SearchBar placeholder="Search agents by name or email..." />
      </div>

      <HybridGrid>
        {agents.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No agents found for this status.
          </div>
        ) : (
          agents.map((agent) => (
            <AdminAgentItem 
              key={agent.id} 
              agent={agent as any} 
              unassignedFields={unassignedOptions} 
              activeAgents={agentOptions}
            />
          ))
        )}
      </HybridGrid>
    </DashboardContainer>
  );
}
