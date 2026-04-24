import { cn } from "@/lib/utils";
import * as React from "react";

const badgeVariants = {
  default: "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700",
  success: "rounded-full bg-emerald-100 text-emerald-800",
  warning: "rounded-full bg-amber-100 text-amber-800",
  secondary: "rounded-full bg-slate-100 text-slate-700",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants[variant], className)} {...props} />
  );
}
