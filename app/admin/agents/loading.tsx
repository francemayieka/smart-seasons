import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AdminAgentsLoading() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-12 flex items-center justify-center border-b border-slate-100 pb-12">
        <LoadingSpinner size="lg" label="Loading agents directory..." />
      </div>
      
      <div className="animate-pulse">
        {/* Page Header Skeleton */}
        <div className="mb-10 flex justify-between items-start">
          <div className="space-y-4">
            <div className="h-10 w-48 bg-slate-200 rounded-2xl" />
            <div className="h-4 w-96 bg-slate-100 rounded-xl" />
          </div>
          <div className="h-12 w-32 bg-slate-200 rounded-2xl" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="h-14 w-full lg:w-96 bg-slate-100/50 border border-slate-200/50 rounded-2xl" />
          <div className="h-14 w-full lg:w-80 bg-slate-100 rounded-2xl" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-white border border-slate-200 rounded-[32px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
