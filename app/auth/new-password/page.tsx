"use client";

import { useState } from "react";
import { updatePasswordAction } from "./actions";
import { signOut } from "next-auth/react";
import { AuthCard } from "@/components/auth/auth-card";

export default function NewPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const result = await updatePasswordAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSuccess(true);
      // Automatically sign out after 3 seconds, then redirect to login
      setTimeout(() => {
        signOut({ callbackUrl: "/auth/signin" });
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AuthCard title="Update Password" subtitle="Please change your temporary password to secure your account.">
        {success ? (
          <div className="text-center">
            <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-emerald-700 font-medium border border-emerald-100">
              Password successfully updated! Your account is now active.
            </div>
            <p className="text-sm text-slate-500">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 font-medium">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">New Password</label>
              <input 
                required 
                name="password" 
                type="password" 
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                placeholder="Enter new password" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Confirm New Password</label>
              <input 
                required 
                name="confirmPassword" 
                type="password" 
                className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                placeholder="Confirm new password" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </AuthCard>
    </div>
  );
}
