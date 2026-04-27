import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AgentLoading() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-12 flex items-center justify-center border-b border-slate-100 pb-12">
        <LoadingSpinner size="lg" label="Loading Agent Portal..." />
      </div>

      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-10 w-64 bg-slate-200 rounded-2xl mb-4" />
          <div className="h-4 w-96 bg-slate-100 rounded-xl" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 bg-white border border-slate-200 rounded-[32px]" />
          ))}
        </div>

        {/* Field List Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-slate-200 rounded-xl" />
            <div className="h-10 w-32 bg-slate-100 rounded-xl" />
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-white border border-slate-200 rounded-[32px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
