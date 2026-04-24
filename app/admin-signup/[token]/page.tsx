import { prisma } from "@/lib/prisma";
import { AuthCard } from "@/components/auth/auth-card";
import { AdminSignupForm } from "./AdminSignupForm";
import Link from "next/link";

export default async function AdminSignupPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const invite = await prisma.adminInvite.findUnique({
    where: { token, used: false, expires: { gt: new Date() } },
  });

  if (!invite) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full text-center">
          <div className="rounded-3xl bg-white p-10 shadow-xl border border-slate-100">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-50 p-4 text-red-600">
                <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0zM12 9v4M12 17h.01"/></svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Invite Invalid or Expired</h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              This admin signup link is no longer valid. Admin registration is restricted and requires a fresh invite from an existing administrator.
            </p>
            <Link href="/" className="mt-8 inline-block font-semibold text-emerald-600 hover:text-emerald-500">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <AuthCard title="Admin Registration" subtitle="Create your coordinator account">
        <AdminSignupForm token={token} />
      </AuthCard>
    </div>
  );
}
