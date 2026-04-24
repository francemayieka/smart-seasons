import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FieldIcon, LeafIcon, WarningIcon } from "@/components/ui/icons";

interface FieldCardProps {
  name: string;
  cropType: string;
  stage: string;
  status: string;
  agent?: string;
  lastUpdated: string;
}

export function FieldCard({ name, cropType, stage, status, agent, lastUpdated }: FieldCardProps) {
  const statusVariant = status === "At Risk" ? "warning" : status === "Completed" ? "secondary" : "success";

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{cropType}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{name}</h3>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
          {status === "At Risk" ? <WarningIcon /> : <LeafIcon />}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current stage</p>
          <p className="mt-1 font-semibold text-slate-900">{stage}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Assigned agent</p>
          <p className="mt-1 font-semibold text-slate-900">{agent || "Unassigned"}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant={statusVariant}>{status}</Badge>
        <p className="text-sm text-slate-500">Updated {lastUpdated}</p>
      </div>
    </Card>
  );
}
