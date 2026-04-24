"use client";

import { useState } from "react";
import { updateFieldAction } from "./actions";
import { Badge } from "@/components/ui/badge";

interface FieldProps {
  field: {
    id: string;
    name: string;
    cropType: string;
    stage: string;
    status: string;
    observations: { 
      id: string, 
      stage: string, 
      note: string, 
      cropHealth: string | null,
      soilCondition: string | null,
      createdAt: Date 
    }[];
  }
}

export function AgentFieldItem({ field }: FieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.append("fieldId", field.id);
    const result = await updateFieldAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900">{field.name}</h3>
            <Badge variant={field.status === "At Risk" ? "warning" : field.status === "Completed" ? "secondary" : "success"}>
              {field.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {field.cropType} &bull; Current Stage: <span className="text-emerald-600">{field.stage}</span>
          </p>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
        >
          {isOpen ? "Close Form" : "Update Stage & Add Note"}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-6 border-t border-slate-100 pt-6 space-y-4">
          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Update Stage</label>
            <select 
              name="stage" 
              defaultValue={field.stage}
              className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
            >
              <option value="Planted">Planted</option>
              <option value="Growing">Growing</option>
              <option value="Ready">Ready</option>
              <option value="Harvested">Harvested</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Crop Health</label>
              <select 
                required 
                name="cropHealth" 
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                <option value="Good">Good (Healthy)</option>
                <option value="Fair">Fair (Minor Issues)</option>
                <option value="Poor">Poor (Visible Stress/Damage)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Soil Condition</label>
              <select 
                required 
                name="soilCondition" 
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                <option value="Optimal">Optimal Moisture</option>
                <option value="Dry">Dry / Needs Water</option>
                <option value="Saturated">Saturated / Flooded</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Observation Note</label>
            <textarea 
              required
              name="note"
              rows={3}
              placeholder="Record any observations, health status, or updates..."
              className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-6 py-2.5 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Update"}
            </button>
          </div>
        </form>
      )}

      {field.observations.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Your Recent Observations</h4>
          <div className="space-y-3">
            {field.observations.map(obs => (
              <div key={obs.id} className="rounded-xl bg-slate-50 p-4 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-700">Stage: {obs.stage}</span>
                  <div className="flex gap-2">
                    {obs.cropHealth && <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Health: {obs.cropHealth}</span>}
                    {obs.soilCondition && <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Soil: {obs.soilCondition}</span>}
                    <span className="text-xs text-slate-500">{new Date(obs.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-1 leading-relaxed">{obs.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
