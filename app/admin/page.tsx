import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardStats, DashboardUpdates } from "./DashboardComponents";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="mt-2 text-slate-600">Monitor all fields, review agent performance, and validate field status.</p>
      </div>

      <Suspense fallback={
        <div className="grid gap-6 md:grid-cols-3 mb-10 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white border border-slate-200 rounded-3xl" />)}
        </div>
      }>
        <DashboardStats />
      </Suspense>

      <Suspense fallback={
        <div className="w-full animate-pulse">
          <div className="h-96 bg-white border border-slate-200 rounded-3xl" />
        </div>
      }>
        <DashboardUpdates />
      </Suspense>
    </div>
  );
}
