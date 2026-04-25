import { SummaryCard } from "@/components/summary-card";
import { prisma } from "@/lib/prisma";
import { UserIcon, FieldIcon, WarningIcon } from "@/components/ui/icons";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  const [totalFields, atRiskFields, totalAgents, latestObservations] = await Promise.all([
    prisma.field.count(),
    prisma.field.count({ where: { status: "AtRisk" } }),
    prisma.user.count({ where: { role: "AGENT" } }),
    prisma.observation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { field: true, agent: true }
    })
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="mt-2 text-slate-600">Monitor all fields, review agent performance, and validate field status.</p>
      </div>

      <section className="grid gap-6 md:grid-cols-3 mb-10">
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

      <div className="w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
    </div>
  );
}
