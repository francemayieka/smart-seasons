import { cn } from "@/lib/utils";
import * as React from "react";

const badgeVariants = {
  default: "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-slate-600",
  success: "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-emerald-600",
  warning: "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-amber-600",
  secondary: "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-slate-500",
};

const dotVariants = {
  default: "h-1.5 w-1.5 rounded-full bg-slate-400",
  success: "h-1.5 w-1.5 rounded-full bg-emerald-500",
  warning: "h-1.5 w-1.5 rounded-full bg-amber-500",
  secondary: "h-1.5 w-1.5 rounded-full bg-slate-300",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants[variant], className)} {...props}>
      <span className={dotVariants[variant]} />
      {children}
    </span>
  );
}
