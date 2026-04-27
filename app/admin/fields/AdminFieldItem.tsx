"use client";

import { useState } from "react";
import { FieldCardShell } from "@/components/ui/field-card-shell";
import { useClickAway } from "@/hooks/use-click-away";
import { FieldAgentSelect } from "./FieldAgentSelect";
import { ObservationItem, CardActionGroup } from "@/components/dashboard/shared-components";

interface FieldProps {
  field: {
    id: string;
    name: string;
    cropType: string;
    stage: string;
    status: string;
    agentId: string | null;
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
  };
  agents: { id: string, name: string }[];
}

export function AdminFieldItem({ field, agents }: FieldProps) {
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
        <CardActionGroup
          label="Assignment"
          control={<FieldAgentSelect fieldId={field.id} currentAgentId={field.agentId} agents={agents} />}
          toggleLabel={`Updates (${field.observations.length})`}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
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
                <ObservationItem
                  key={obs.id}
                  stage={obs.stage}
                  note={obs.note}
                  createdAt={obs.createdAt}
                  agentName={obs.agent?.name}
                  cropHealth={obs.cropHealth}
                  soilCondition={obs.soilCondition}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </FieldCardShell>
  );
}
