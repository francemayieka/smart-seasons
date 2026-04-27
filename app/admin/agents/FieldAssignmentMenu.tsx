"use client";

import { useState } from "react";
import { assignFieldToAgent } from "../fields/actions";
import { ChevronDownIcon } from "@/components/ui/icons";

interface AgentOption {
  id: string;
  name: string;
}

interface FieldAssignmentMenuProps {
  fieldId: string;
  currentAgentId: string;
  activeAgents: AgentOption[];
}

export function FieldAssignmentMenu({ fieldId, currentAgentId, activeAgents }: FieldAssignmentMenuProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleAction(newAgentId: string | null) {
    setIsUpdating(true);
    const result = await assignFieldToAgent(fieldId, newAgentId);
    if (!result.success) {
      alert(result.error || "Failed to update assignment");
    }
    setIsUpdating(false);
  }

  return (
    <div className="relative group">
      <select
        disabled={isUpdating}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "unassign") handleAction(null);
          else if (val) handleAction(val);
        }}
        value=""
        className={`appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-[10px] font-bold text-slate-600 outline-none transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-50 ${
          isUpdating ? "animate-pulse" : ""
        }`}
      >
        <option value="" disabled>Manage Field</option>
        <option value="unassign" className="text-rose-600 font-bold">Unassign Field</option>
        <optgroup label="Reassign to:">
          {activeAgents.filter(a => a.id !== currentAgentId).map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </optgroup>
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <ChevronDownIcon className="h-3 w-3 text-slate-400" />
      </div>
    </div>
  );
}
