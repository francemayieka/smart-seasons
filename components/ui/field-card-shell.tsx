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

export const FieldCardShell = React.forwardRef<HTMLDivElement, FieldCardShellProps>(
  ({ 
    name, 
    status, 
    cropType, 
    stage, 
    agentName, 
    actions, 
    children 
  }, ref) => {
    return (
      <DashboardCard ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0 max-w-full">
          <div className="min-w-0 flex-1 max-w-full">
            <div className="flex items-center gap-3 flex-wrap min-w-0">
              <h3 className="text-xl font-bold text-slate-900 break-words">{name}</h3>
              <StatusBadge status={status} />
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500 font-roboto">
              {cropType} &bull; Stage: <span className="text-emerald-600">{stage}</span>
            </p>
            {agentName && (
              <p className="mt-2 text-xs font-medium text-slate-400">
                Assigned to: <span className="text-slate-600">{agentName}</span>
              </p>
            )}
          </div>
          
          <div className="shrink-0 w-full sm:w-auto max-w-full">
            {actions}
          </div>
        </div>

        {children}
      </DashboardCard>
    );
  }
);

FieldCardShell.displayName = "FieldCardShell";
