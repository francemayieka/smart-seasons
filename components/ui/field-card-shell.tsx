import React from "react";
import { DashboardCard, StatusBadge } from "./dashboard-ui";

interface FieldCardShellProps {
  name: string;
  status: string;
  cropType: string;
  stage: string;
  agentName?: string | null;
  actions: React.ReactNode;
  children?: React.ReactNode;
}

export function FieldCardShell({ 
  name, 
  status, 
  cropType, 
  stage, 
  agentName, 
  actions, 
  children 
}: FieldCardShellProps) {
  return (
    <DashboardCard>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none">{name}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500 font-roboto">
            {cropType} &bull; Current Stage: <span className="text-emerald-600">{stage}</span>
          </p>
          {agentName && (
            <p className="mt-2 text-xs font-medium text-slate-400">
              Assigned to: <span className="text-slate-600">{agentName}</span>
            </p>
          )}
        </div>
        
        <div className="shrink-0">
          {actions}
        </div>
      </div>

      {children}
    </DashboardCard>
  );
}
