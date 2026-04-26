import React from "react";

export default function FieldsLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-10 w-64 bg-slate-200 rounded-2xl mb-4"></div>
          <div className="h-4 w-96 bg-slate-100 rounded-xl"></div>
        </div>
        <div className="h-11 w-32 bg-slate-200 rounded-2xl"></div>
      </div>

      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 bg-slate-200 rounded-xl"></div>
        ))}
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white border border-slate-200 rounded-3xl"></div>
        ))}
      </div>
    </div>
  );
}
