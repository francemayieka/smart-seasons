import { UserIcon } from "@/components/ui/icons";
import { AgentStatusSelect } from "./AgentStatusSelect";
import Link from "next/link";
import { getAdminAgents } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";

export default async function AdminAgentsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const params = await searchParams;
  const statusFilter = params.status || "pending"; 

  const agents = await getAdminAgents(statusFilter);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agents</h1>
          <p className="mt-2 text-slate-600">Manage field agents, view their assignments, and update their status.</p>
        </div>
        <Link href="/admin/agents/new" className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition">
          Add Agent
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-nowrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit max-w-full overflow-x-auto no-scrollbar">
        {["pending", "active", "former"].map((status) => (
          <SmartPrefetch key={status} type="agents" className="contents">
            <Link
              href={`?status=${status}`}
              className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition ${
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

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {agents.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No agents found for this status.</div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600 min-w-[600px]">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Joined</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <UserIcon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{agent.email}</td>
                    <td className="px-6 py-4">{new Date(agent.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <AgentStatusSelect agentId={agent.id} currentStatus={agent.agentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
