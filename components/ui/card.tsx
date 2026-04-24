import { cn } from "@/lib/utils";
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/60",
        className
      )}
      {...props}
    />
  );
}
