"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { UserIcon } from "@/components/ui/icons";

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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900">{field.name}</h3>
            <Badge variant={field.status === "AtRisk" ? "warning" : field.status === "Completed" ? "secondary" : "success"}>
              {field.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {field.cropType} &bull; Current Stage: <span className="text-emerald-600">{field.stage}</span>
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <UserIcon className="h-4 w-4" />
            <span>Agent: {field.agentName || "Unassigned"}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
        >
          {isOpen ? "Hide History" : `View Updates (${field.observations.length})`}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Field History & Updates</h4>
          {field.observations.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No observations recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {field.observations.map(obs => (
                <div key={obs.id} className="rounded-xl bg-slate-50 p-4 text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-700">Stage Update: {obs.stage}</span>
                    <div className="flex gap-2">
                      {obs.cropHealth && <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Health: {obs.cropHealth}</span>}
                      {obs.soilCondition && <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Soil: {obs.soilCondition}</span>}
                      <span className="text-xs text-slate-500">{new Date(obs.createdAt).toLocaleString()}</span>
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
    </div>
  );
}
