"use client";

import { useTransition } from "react";
import { updateAgentStatus } from "./actions";

export function AgentStatusSelect({ agentId, currentStatus }: { agentId: string, currentStatus: "PENDING" | "ACTIVE" | "FORMER" }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as "PENDING" | "ACTIVE" | "FORMER";
    startTransition(() => {
      updateAgentStatus(agentId, newStatus);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium outline-none transition disabled:opacity-50 ${
        currentStatus === "ACTIVE"
          ? "bg-emerald-50 text-emerald-700"
          : currentStatus === "PENDING"
          ? "bg-amber-50 text-amber-700"
          : "bg-slate-100 text-slate-700"
      }`}
    >
      <option value="ACTIVE">Active</option>
      <option value="PENDING">Pending</option>
      <option value="FORMER">Former</option>
    </select>
  );
}
