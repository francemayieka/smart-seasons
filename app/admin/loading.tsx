import React from "react";

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      <div className="mb-8">
        <div className="h-10 w-64 bg-slate-200 rounded-2xl mb-4"></div>
        <div className="h-4 w-96 bg-slate-100 rounded-xl"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white border border-slate-200 rounded-3xl"></div>
        ))}
      </div>

      <div className="h-96 bg-white border border-slate-200 rounded-3xl"></div>
    </div>
  );
}
