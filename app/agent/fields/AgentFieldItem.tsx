"use client";

import { useState } from "react";
import { updateFieldAction } from "./actions";
import { FieldCardShell } from "@/components/ui/field-card-shell";
import { CloseIcon } from "@/components/ui/icons";
import { useClickAway } from "@/hooks/use-click-away";

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
  const [success, setSuccess] = useState(false);
  const cardRef = useClickAway(() => setIsOpen(false));

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
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <FieldCardShell
      ref={cardRef}
      name={field.name}
      status={field.status}
      cropType={field.cropType}
      stage={field.stage}
      actions={
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all shadow-lg w-full sm:w-auto ${
            isOpen 
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-slate-100" 
              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
          }`}
        >
          {isOpen ? (
            <>
              <CloseIcon className="h-4 w-4" />
              <span>Close Form</span>
            </>
          ) : (
            "Add Update"
          )}
        </button>
      }
    >

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-6 border-t border-slate-100 pt-6 space-y-4 text-left">
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

          <div className="flex justify-center lg:justify-end pt-2">
            <button 
              type="submit" 
              disabled={loading || success}
              className={`rounded-xl px-8 py-3 font-semibold text-white transition disabled:opacity-50 w-full lg:w-auto ${
                success ? "bg-emerald-500" : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100"
              }`}
            >
              {loading ? "Saving..." : success ? "Saved! ✓" : "Save Update"}
            </button>
          </div>
        </form>
      )}

      {field.observations.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3 font-poppins">Recent Observations</h4>
          <div className="space-y-3">
            {field.observations.map(obs => (
              <div key={obs.id} className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 text-sm font-roboto">
                <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-semibold text-slate-700 underline underline-offset-4 decoration-emerald-200 text-left">Stage: {obs.stage}</span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {obs.cropHealth && (
                      <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-100">
                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                        {obs.cropHealth}
                      </span>
                    )}
                    {obs.soilCondition && (
                      <span className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 border border-blue-100">
                        <span className="h-1 w-1 rounded-full bg-blue-500" />
                        {obs.soilCondition}
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-auto sm:ml-0">{new Date(obs.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-1 leading-relaxed text-left">{obs.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </FieldCardShell>
  );
}
