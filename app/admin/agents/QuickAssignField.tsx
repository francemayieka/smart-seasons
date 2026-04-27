"use client";

import { useState } from "react";
import { assignFieldToAgent } from "../fields/actions";
import { PlusIcon } from "@/components/ui/icons";

interface FieldOption {
  id: string;
  name: string;
}

interface QuickAssignProps {
  agentId: string;
  unassignedFields: FieldOption[];
}

export function QuickAssignField({ agentId, unassignedFields }: QuickAssignProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleAssign(fieldId: string) {
    if (!fieldId) return;
    setIsUpdating(true);
    const result = await assignFieldToAgent(fieldId, agentId);
    if (!result.success) {
      alert(result.error || "Failed to assign field");
    }
    setIsUpdating(false);
  }

  if (unassignedFields.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Quick Assign</span>
      <div className="relative">
        <select
          disabled={isUpdating}
          onChange={(e) => handleAssign(e.target.value)}
          value=""
          className={`w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 py-2 text-xs font-bold text-slate-700 outline-none transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 ${
            isUpdating ? "animate-pulse" : ""
          }`}
        >
          <option value="" disabled>Select field to assign...</option>
          {unassignedFields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name}
            </option>
          ))}
        </select>
        <PlusIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-emerald-500" />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
