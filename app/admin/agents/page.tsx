import { AdminAgentItem } from "./AdminAgentItem";
import Link from "next/link";
import { getAdminAgents } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";

export default async function AdminAgentsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const params = await searchParams;
  const statusFilter = params.status || "pending"; 

  const agents = await getAdminAgents(statusFilter);

  return (
    <div className="mx-auto max-w-6xl w-full px-4 sm:px-0">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agents</h1>
          <p className="mt-2 text-slate-600">Manage field agents, view their assignments, and update their status.</p>
        </div>
        <Link 
          href="/admin/agents/new" 
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 w-full sm:w-auto"
        >
          Add Agent
        </Link>
      </div>

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

      <div className="space-y-6">
        {agents.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No agents found for this status.
          </div>
        ) : (
          agents.map((agent) => (
            <AdminAgentItem key={agent.id} agent={agent as any} />
          ))
        )}
      </div>
    </div>
  );
}
