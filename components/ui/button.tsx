import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = {
  default:
    "inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
  outline:
    "inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700",
  ghost:
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
}

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants[variant], className)} {...props} />
  );
}
