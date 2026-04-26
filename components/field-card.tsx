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
        <div className={`p-1 ${status === "At Risk" ? "text-amber-500" : "text-emerald-500"}`}>
          {status === "At Risk" ? <WarningIcon className="h-6 w-6" /> : <LeafIcon className="h-6 w-6" />}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 font-roboto">
        <div className="text-sm text-slate-600">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-poppins">Current stage</p>
          <p className="mt-1 font-semibold text-slate-900 underline underline-offset-4 decoration-slate-100">{stage}</p>
        </div>
        <div className="text-sm text-slate-600">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-poppins">Assigned agent</p>
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
