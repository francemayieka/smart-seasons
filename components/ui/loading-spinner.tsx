import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
}

export function LoadingSpinner({ className, size = "md", label }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn(
        "animate-spin rounded-full border-emerald-500 border-t-transparent shadow-emerald-100",
        sizeClasses[size]
      )} />
      {label && (
        <p className="text-sm font-medium text-slate-400 animate-pulse">{label}</p>
      )}
    </div>
  );
}
