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
        <div className="p-1 text-emerald-500 group-hover:scale-110 transition-transform">
          <ChartIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-500 font-roboto">
        <p>{detail}</p>
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </div>
    </Card>
  );
}
