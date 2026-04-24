"use client";

import { useState } from "react";
import { adminSignupAction } from "./actions";

export function SignupClient({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await adminSignupAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <input type="hidden" name="token" value={token} />
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input 
          required 
          name="name" 
          type="text" 
          className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
          placeholder="Jane Doe" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input 
          required 
          name="email" 
          type="email" 
          className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
          placeholder="jane@example.com" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input 
          required 
          name="password" 
          type="password" 
          className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
          placeholder="••••••••" 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Admin Account"}
      </button>
    </form>
  );
}
