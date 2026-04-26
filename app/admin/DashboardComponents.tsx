import { getDashboardStats } from "@/lib/data";
import { SummaryCard } from "@/components/summary-card";
import { FieldIcon } from "@/components/ui/icons";

export async function DashboardStats() {
  const { totalFields, atRiskFields, totalAgents } = await getDashboardStats();
  
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      <SummaryCard 
        label="Total Fields" 
        value={totalFields.toString()} 
        detail="All registered plots" 
        badgeLabel="Live" 
      />
      <SummaryCard 
        label="At Risk" 
        value={atRiskFields.toString()} 
        detail="Issues detected by AI" 
        badgeLabel={atRiskFields > 0 ? "Review Needed" : "All Clear"} 
        badgeVariant={atRiskFields > 0 ? "warning" : "success"} 
      />
      <SummaryCard 
        label="Active Agents" 
        value={totalAgents.toString()} 
        detail="Field staff coverage" 
        badgeLabel="Active" 
        badgeVariant="success" 
      />
    </section>
  );
}

export async function DashboardUpdates() {
  const { latestObservations } = await getDashboardStats();
  
  return (
    <div className="w-full">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Latest Updates</h2>
        {latestObservations.length === 0 ? (
          <p className="text-slate-500 italic">No updates recorded yet.</p>
        ) : (
          <div className="space-y-6">
            {latestObservations.map(obs => (
              <div key={obs.id} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <FieldIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900 truncate">{obs.field.name}</p>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 shrink-0">
                      {new Date(obs.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">Updated by {obs.agent?.name} &bull; Stage: {obs.stage}</p>
                  <p className="text-sm text-slate-600 line-clamp-2">{obs.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
