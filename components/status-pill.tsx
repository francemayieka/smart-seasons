import { Badge } from "@/components/ui/badge";

interface StatusPillProps {
  status: "Active" | "At Risk" | "Completed";
}

export function StatusPill({ status }: StatusPillProps) {
  const variant = status === "At Risk" ? "warning" : status === "Completed" ? "secondary" : "success";

  return <Badge variant={variant}>{status}</Badge>;
}
