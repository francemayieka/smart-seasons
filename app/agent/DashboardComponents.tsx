import { getAgentStats } from "@/lib/data";
import { StatGrid, UpdateList } from "@/components/dashboard/shared-components";

export async function AgentDashboardStats({ agentId }: { agentId: string }) {
  const { totalFields, atRiskFields, latestObservations } = await getAgentStats(agentId);
  
  const stats = [
    { label: "Your Fields", value: totalFields, detail: "Total assigned plots", badgeLabel: "Active" },
    { 
      label: "Priority Check", 
      value: atRiskFields, 
      detail: "Fields marked as At Risk", 
      badgeLabel: atRiskFields > 0 ? "Action Required" : "Stable",
      badgeVariant: atRiskFields > 0 ? "warning" as const : "success" as const
    },
    { label: "Total Updates", value: latestObservations.length, detail: "Recent field activity", badgeLabel: "On Track", badgeVariant: "success" as const },
  ];

  return <StatGrid stats={stats} />;
}

export async function AgentRecentUpdates({ agentId }: { agentId: string }) {
  const { latestObservations } = await getAgentStats(agentId);
  
  const updates = latestObservations.map(obs => ({
    id: obs.id,
    fieldName: obs.field.name,
    date: obs.createdAt,
    stage: obs.stage,
    note: obs.note
  }));

  return <UpdateList updates={updates} title="Your Recent Updates" />;
}
