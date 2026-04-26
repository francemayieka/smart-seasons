"use client";

import { useTransition, useOptimistic } from "react";
import { updateAgentStatus } from "./actions";

type Status = "PENDING" | "ACTIVE" | "FORMER";

export function AgentStatusSelect({ agentId, currentStatus }: { agentId: string, currentStatus: Status }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    
    startTransition(async () => {
      setOptimisticStatus(newStatus);
      await updateAgentStatus(agentId, newStatus);
    });
  };

  return (
    <select
      value={optimisticStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium outline-none transition disabled:opacity-50 ${
        optimisticStatus === "ACTIVE"
          ? "bg-emerald-50 text-emerald-700"
          : optimisticStatus === "PENDING"
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
