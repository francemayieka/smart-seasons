"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="rounded-full bg-amber-100 p-6 text-amber-600 mb-8">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Something went wrong</h1>
      <p className="max-w-md text-slate-500 mb-10 leading-relaxed">
        We encountered an unexpected error. Our team has been notified.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="rounded-2xl bg-white border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 hover:bg-slate-50 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
