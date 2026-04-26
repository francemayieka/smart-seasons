"use client";

import { useState } from "react";
import { createAgentAction } from "./actions";
import Link from "next/link";
export default function NewAgentPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ email: string, generatedPassword: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await createAgentAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSuccessData({
        email: formData.get("email") as string,
        generatedPassword: result.generatedPassword!,
      });
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New Agent</h1>
          <p className="mt-2 text-slate-600">Register a new field agent directly into the system.</p>
        </div>
        <Link href="/admin/agents" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 w-fit">
          &larr; Back to Agents
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        {successData ? (
          <div className="text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Agent added successfully!</h2>
            </div>
            
            <div className="rounded-2xl bg-slate-50 p-4 sm:p-6 text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Temporary Login Details:</p>
              <div className="space-y-2 break-all">
                <p className="text-base sm:text-lg font-mono text-slate-900 flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-slate-400 font-sans text-xs">Email:</span> {successData.email}
                </p>
                <p className="text-base sm:text-lg font-mono text-slate-900 flex flex-col sm:flex-row sm:gap-2">
                  <span className="text-slate-400 font-sans text-xs">Pass:</span> {successData.generatedPassword}
                </p>
              </div>
              <p className="mt-4 text-[10px] sm:text-xs text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100 leading-relaxed">
                The agent will be prompted to change this temporary password upon their first login. Their account will remain pending until this step is completed.
              </p>
            </div>

            <Link 
              href="/admin/agents?status=pending"
              className="inline-block rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              View Pending Agents
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input 
                required 
                name="name" 
                type="text" 
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                placeholder="E.g., John Doe" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <input 
                required 
                name="email" 
                type="email" 
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                placeholder="agent@example.com" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Generating Credentials..." : "Create & Generate Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
