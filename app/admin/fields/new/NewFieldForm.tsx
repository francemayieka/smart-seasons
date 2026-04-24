"use client";

import { useState } from "react";
import { createFieldAction } from "./actions";

export function NewFieldForm({ agents }: { agents: { id: string, name: string }[] }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await createFieldAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-slate-700">Field Name</label>
        <input 
          required 
          name="name" 
          type="text" 
          className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
          placeholder="E.g., North Ridge Plot A" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Crop Type</label>
          <input 
            required 
            name="cropType" 
            type="text" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
            placeholder="E.g., Maize, Tomato" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Planting Date</label>
          <input 
            required 
            name="plantingDate" 
            type="date" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Current Stage</label>
          <select 
            required 
            name="currentStage" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
          >
            <option value="Planted">Planted</option>
            <option value="Growing">Growing</option>
            <option value="Ready">Ready</option>
            <option value="Harvested">Harvested</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Assign Field Agent</label>
          <select 
            name="agentId" 
            className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
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
        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? "Saving Field..." : "Save Field"}
      </button>
    </form>
  );
}
