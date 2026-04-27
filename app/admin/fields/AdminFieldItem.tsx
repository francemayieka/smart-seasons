"use client";

import { useState } from "react";
import { FieldCardShell } from "@/components/ui/field-card-shell";
import { useClickAway } from "@/hooks/use-click-away";

interface FieldProps {
  field: {
    id: string;
    name: string;
    cropType: string;
    stage: string;
    status: string;
    agentName: string | null;
    observations: { 
      id: string, 
      stage: string, 
      note: string, 
      cropHealth: string | null,
      soilCondition: string | null,
      createdAt: Date, 
      agent: { name: string } | null 
    }[];
  }
}

export function AdminFieldItem({ field }: FieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useClickAway(() => setIsOpen(false));

  return (
    <FieldCardShell
      ref={cardRef}
      name={field.name}
      status={field.status}
      cropType={field.cropType}
      stage={field.stage}
      agentName={field.agentName}
      actions={
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition whitespace-nowrap"
        >
          {isOpen ? "Hide History" : `View Updates (${field.observations.length})`}
        </button>
      }
    >

      {isOpen && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Field History & Updates</h4>
          {field.observations.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No observations recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {field.observations.map(obs => (
                <div key={obs.id} className="rounded-xl bg-slate-50 p-4 text-sm">
                  <div className="flex flex-col gap-2 mb-2 md:flex-row md:justify-between md:items-center">
                    <span className="font-semibold text-slate-700">Stage Update: {obs.stage}</span>
                    <div className="flex flex-wrap gap-2 items-center">
                      {obs.cropHealth && <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200/50">Health: {obs.cropHealth}</span>}
                      {obs.soilCondition && <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700 border border-blue-200/50">Soil: {obs.soilCondition}</span>}
                      <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{new Date(obs.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-2 leading-relaxed">{obs.note}</p>
                  <p className="text-xs font-medium text-slate-400">Recorded by: {obs.agent?.name || "Unknown"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </FieldCardShell>
  );
}
