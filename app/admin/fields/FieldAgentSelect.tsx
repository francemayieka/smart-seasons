"use client";

import { useState } from "react";
import { assignFieldToAgent } from "./actions";
import { UserIcon } from "@/components/ui/icons";

interface AgentOption {
  id: string;
  name: string;
}

interface FieldAgentSelectProps {
  fieldId: string;
  currentAgentId: string | null;
  agents: AgentOption[];
}

export function FieldAgentSelect({ fieldId, currentAgentId, agents }: FieldAgentSelectProps) {
  const [selectedId, setSelectedId] = useState(currentAgentId || "");
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleAssign(newAgentId: string) {
    setIsUpdating(true);
    const result = await assignFieldToAgent(fieldId, newAgentId || null);
    if (result.success) {
      setSelectedId(newAgentId);
    } else {
      // Revert on error
      setSelectedId(currentAgentId || "");
      alert("Failed to update assignment");
    }
    setIsUpdating(false);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <select
          value={selectedId}
          disabled={isUpdating}
          onChange={(e) => handleAssign(e.target.value)}
          className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 py-2 text-xs font-bold text-slate-700 outline-none transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 ${
            isUpdating ? "animate-pulse" : ""
          }`}
        >
          <option value="">Unassigned</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        <UserIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
