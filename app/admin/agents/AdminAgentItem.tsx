"use client";

import { useState } from "react";
import { UserIcon, FieldIcon, ChartIcon } from "@/components/ui/icons";
import { AgentStatusSelect } from "./AgentStatusSelect";
import { ObservationItem, CardActionGroup } from "@/components/dashboard/shared-components";
import { QuickAssignField } from "./QuickAssignField";
import { FieldAssignmentMenu } from "./FieldAssignmentMenu";

interface AgentProps {
  agent: {
    id: string;
    name: string;
    email: string;
    createdAt: Date | string;
    agentStatus: "PENDING" | "ACTIVE" | "FORMER";
    _count: {
      fields: number;
      observations: number;
    };
    fields: {
      id: string;
      name: string;
      currentStage: string;
      status: string;
      observations: {
        id: string;
        stage: string;
        note: string;
        createdAt: Date | string;
      }[];
    }[];
    observations: {
      field: {
        id: string;
        name: string;
        currentStage: string;
        status: string;
        observations: {
          id: string;
          stage: string;
          note: string;
          createdAt: Date | string;
        }[];
      }
    }[];
  };
  unassignedFields: { id: string, name: string }[];
  activeAgents: { id: string, name: string }[];
}

export function AdminAgentItem({ agent, unassignedFields, activeAgents }: AgentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isFormer = agent.agentStatus === "FORMER";
  
  // Deduplicate historical fields from observations
  const historicalFieldsMap = new Map<string, typeof agent.fields[0]>();
  agent.observations?.forEach(obs => {
    if (obs.field && !historicalFieldsMap.has(obs.field.id)) {
      historicalFieldsMap.set(obs.field.id, obs.field as any);
    }
  });
  const historicalFields = Array.from(historicalFieldsMap.values());

  const displayFields = isFormer ? historicalFields : agent.fields;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900 truncate">{agent.name}</h3>
            <p className="text-sm text-slate-500 font-medium truncate">{agent.email}</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <FieldIcon className="h-3.5 w-3.5 text-emerald-500" />
                {agent._count.fields} Fields
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <ChartIcon className="h-3.5 w-3.5 text-blue-500" />
                {agent._count.observations} Updates
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-5 border-t border-slate-50 pt-4 lg:border-0 lg:pt-0">
          <div className="flex flex-col gap-4 w-full sm:w-64">
            <CardActionGroup
              label="Status"
              control={<AgentStatusSelect agentId={agent.id} currentStatus={agent.agentStatus} />}
            />
            {!isFormer && (
              <QuickAssignField agentId={agent.id} unassignedFields={unassignedFields} />
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full rounded-xl bg-slate-100 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              {isExpanded 
                ? `Hide ${isFormer ? "History" : "Portfolio"}` 
                : `View ${isFormer ? "History" : "Portfolio"} (${isFormer ? historicalFields.length : agent._count.fields})`}
            </button>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Joined: {new Date(agent.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {isFormer ? "Previously Assigned Portfolio" : "Currently Assigned Portfolio"}
          </h4>
          {displayFields.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No field history found.</p>
          ) : (
            <div className="space-y-6">
              {displayFields.map(field => (
                <div key={field.id} className="space-y-4 pb-6 border-b border-slate-50 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900">{field.name}</span>
                      <span className="text-xs text-slate-400 font-medium tracking-wide">{field.currentStage}</span>
                    </div>
                    {!isFormer && (
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          field.status === "AtRisk" ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                        }`}>
                          {field.status}
                        </span>
                        <FieldAssignmentMenu 
                          fieldId={field.id} 
                          currentAgentId={agent.id} 
                          activeAgents={activeAgents} 
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {field.observations.map((obs: any) => (
                      <ObservationItem
                        key={obs.id}
                        stage={obs.stage}
                        note={obs.note}
                        createdAt={obs.createdAt}
                      />
                    ))}
                    {field.observations.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic px-1">No updates recorded for this assignment.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
