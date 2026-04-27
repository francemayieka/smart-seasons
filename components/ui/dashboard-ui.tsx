import React from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-2 text-slate-600">{description}</p>}
      </div>
      {action && (
        <Link 
          href={action.href} 
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 w-full md:w-auto"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
      {children}
    </div>
  );
}

export function HybridGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {children}
    </div>
  );
}

export const DashboardCard = React.forwardRef<HTMLDivElement, { children: React.ReactNode, onClick?: () => void, className?: string }>(
  ({ children, onClick, className = "" }, ref) => {
    const Component = onClick ? "button" : "div";
    return (
      <Component 
        ref={ref as any}
        onClick={onClick}
        className={`w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md text-left ${className}`}
      >
        {children}
      </Component>
    );
  }
);

DashboardCard.displayName = "DashboardCard";

export function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    AtRisk: "bg-amber-100 text-amber-700 border-amber-200",
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Completed: "bg-slate-100 text-slate-700 border-slate-200",
    Good: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Fair: "bg-amber-100 text-amber-700 border-amber-200",
    Poor: "bg-red-100 text-red-700 border-red-200",
  };

  const current = variants[status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border ${current}`}>
      {status}
    </span>
  );
}
