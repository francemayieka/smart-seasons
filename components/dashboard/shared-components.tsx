import React from "react";
import { SummaryCard } from "@/components/summary-card";
import { FieldIcon } from "@/components/ui/icons";

interface StatItem {
  label: string;
  value: string | number;
  detail: string;
  badgeLabel: string;
  badgeVariant?: "success" | "warning" | "secondary";
}

export function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      {stats.map((stat, i) => (
        <SummaryCard 
          key={i}
          label={stat.label}
          value={stat.value.toString()}
          detail={stat.detail}
          badgeLabel={stat.badgeLabel}
          badgeVariant={stat.badgeVariant || "success"}
        />
      ))}
    </section>
  );
}

interface UpdateItem {
  id: string;
  fieldName: string;
  agentName?: string;
  date: Date;
  stage: string;
  note: string;
  icon?: React.ReactNode;
}

export function UpdateList({ updates, title }: { updates: UpdateItem[], title: string }) {
  return (
    <div className="w-full">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">{title}</h2>
        {updates.length === 0 ? (
          <p className="text-slate-500 italic">No updates recorded yet.</p>
        ) : (
          <div className="space-y-6">
            {updates.map(update => (
              <div key={update.id} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  {update.icon || <FieldIcon className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900 truncate">{update.fieldName}</p>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 shrink-0">
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    {update.agentName ? `Updated by ${update.agentName} \u2022 ` : ""}Stage: {update.stage}
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-2">{update.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
