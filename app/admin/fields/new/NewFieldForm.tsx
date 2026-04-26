"use client";

import { useState } from "react";
import { createFieldAction } from "./actions";
import Link from "next/link";

export function NewFieldForm({ agents }: { agents: { id: string, name: string }[] }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await createFieldAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6 space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Field Registered!</h2>
          <p className="text-slate-500">The new field has been added to the directory.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link 
            href="/admin/fields"
            className="rounded-2xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700 shadow-lg shadow-emerald-200"
          >
            View Fields
          </Link>
          <button 
            onClick={() => setSuccess(false)}
            className="rounded-2xl bg-slate-100 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 font-poppins">Field Name</label>
        <input 
          required 
          name="name" 
          type="text" 
          className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-roboto" 
          placeholder="E.g., North Ridge Plot A" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 font-poppins">Crop Type</label>
          <input 
            required 
            name="cropType" 
            type="text" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-roboto" 
            placeholder="E.g., Maize, Tomato" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-poppins">Planting Date</label>
          <input 
            required 
            name="plantingDate" 
            type="date" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-roboto" 
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 font-poppins">Current Stage</label>
          <select 
            required 
            name="currentStage" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white font-roboto"
          >
            <option value="Planted">Planted</option>
            <option value="Growing">Growing</option>
            <option value="Ready">Ready</option>
            <option value="Harvested">Harvested</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-poppins">Assign Field Agent</label>
          <select 
            name="agentId" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white font-roboto"
          >
            <option value="">-- Unassigned --</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 shadow-lg shadow-emerald-100"
      >
        {loading ? "Saving Field..." : "Save Field"}
      </button>
    </form>
  );
}
