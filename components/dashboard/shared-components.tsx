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
                    <p className="text-sm font-bold text-slate-900 break-words">{update.fieldName}</p>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 shrink-0">
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    {update.agentName ? `Updated by ${update.agentName} \u2022 ` : ""}Stage: {update.stage}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed break-words">{update.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ObservationItemProps {
  stage: string;
  note: string;
  createdAt: Date | string;
  agentName?: string;
  cropHealth?: string | null;
  soilCondition?: string | null;
}

export function ObservationItem({ stage, note, createdAt, agentName, cropHealth, soilCondition }: ObservationItemProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-sm max-w-full">
      <div className="flex flex-col gap-2 mb-2 md:flex-row md:justify-between md:items-center max-w-full">
        <span className="font-semibold text-slate-700">Stage: {stage}</span>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-full">
          {cropHealth && (
            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-100">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              {cropHealth}
            </span>
          )}
          {soilCondition && (
            <span className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 border border-blue-100">
              <span className="h-1 w-1 rounded-full bg-blue-500" />
              {soilCondition}
            </span>
          )}
          <span className="text-[10px] font-medium text-slate-400 ml-auto sm:ml-0">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <p className="text-slate-600 mb-2 leading-relaxed break-words">{note}</p>
      {agentName && <p className="text-xs font-medium text-slate-400">Recorded by: {agentName}</p>}
    </div>
  );
}

interface CardActionGroupProps {
  label: string;
  control: React.ReactNode;
  toggleLabel?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function CardActionGroup({ label, control, toggleLabel, isOpen, onToggle }: CardActionGroupProps) {
  return (
    <div className="flex flex-col gap-3 w-full sm:w-64">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</span>
        {control}
      </div>
      {onToggle && (
        <button 
          onClick={onToggle}
          className="w-full rounded-xl bg-slate-100 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
        >
          {isOpen ? `Hide ${toggleLabel || "History"}` : `View ${toggleLabel || "History"}`}
        </button>
      )}
    </div>
  );
}
