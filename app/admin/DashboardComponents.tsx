import { getDashboardStats } from "@/lib/data";
import { StatGrid, UpdateList } from "@/components/dashboard/shared-components";

export async function DashboardStats() {
  const { totalFields, atRiskFields, totalAgents } = await getDashboardStats();
  
  const stats = [
    { label: "Total Fields", value: totalFields, detail: "All registered plots", badgeLabel: "Live" },
    { 
      label: "At Risk", 
      value: atRiskFields, 
      detail: "Issues detected by AI", 
      badgeLabel: atRiskFields > 0 ? "Review Needed" : "All Clear",
      badgeVariant: atRiskFields > 0 ? "warning" as const : "success" as const
    },
    { label: "Active Agents", value: totalAgents, detail: "Field staff coverage", badgeLabel: "Active", badgeVariant: "success" as const },
  ];

  return <StatGrid stats={stats} />;
}

export async function DashboardUpdates() {
  const { latestObservations } = await getDashboardStats();
  
  const updates = latestObservations.map(obs => ({
    id: obs.id,
    fieldName: obs.field.name,
    agentName: obs.agent?.name,
    date: obs.createdAt,
    stage: obs.stage,
    note: obs.note
  }));

  return <UpdateList updates={updates} title="Latest Updates" />;
}
