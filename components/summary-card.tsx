import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartIcon } from "@/components/ui/icons";

interface SummaryCardProps {
  label: string;
  value: string;
  detail: string;
  badgeLabel: string;
  badgeVariant?: "success" | "warning" | "secondary";
}

export function SummaryCard({
  label,
  value,
  detail,
  badgeLabel,
  badgeVariant = "secondary",
}: SummaryCardProps) {
  return (
    <Card className="group relative overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
          <ChartIcon />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-600">
        <p>{detail}</p>
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </div>
    </Card>
  );
}
