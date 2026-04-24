"use client";

import { signOut } from "next-auth/react";

export function LogoutButton({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      title="Logout"
      className={className || "inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
      {showText && "Logout"}
    </button>
  );
}