import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50">
      <div className="relative">
        {/* Outer Glow */}
        <div className="absolute -inset-8 rounded-full bg-emerald-100/50 opacity-50 blur-3xl animate-pulse" />
        
        <LoadingSpinner 
          size="xl" 
          label="Preparing your dashboard" 
          className="relative z-10"
        />
        
        <p className="mt-4 text-center text-xs text-slate-400 font-medium animate-pulse">
          Syncing field records and agent status...
        </p>
      </div>
    </div>
  );
}
