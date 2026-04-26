"use client";

import { UserIcon, FieldIcon, ChartIcon } from "@/components/ui/icons";
import { AgentStatusSelect } from "./AgentStatusSelect";

interface AgentProps {
  agent: {
    id: string;
    name: string;
    email: string;
    createdAt: Date | string;
    agentStatus: "PENDING" | "ACTIVE" | "FORMER";
    _count: {
      fields: number;
      observations: number;
    };
  }
}

export function AdminAgentItem({ agent }: AgentProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900 truncate">{agent.name}</h3>
            <p className="text-sm text-slate-500 font-medium truncate">{agent.email}</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <FieldIcon className="h-3.5 w-3.5 text-emerald-500" />
                {agent._count.fields} Fields
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <ChartIcon className="h-3.5 w-3.5 text-blue-500" />
                {agent._count.observations} Updates
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 border-t border-slate-50 pt-4 lg:border-0 lg:pt-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Joined: {new Date(agent.createdAt).toLocaleDateString()}
          </p>
          <AgentStatusSelect agentId={agent.id} currentStatus={agent.agentStatus} />
        </div>
      </div>
    </div>
  );
}
