import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminFieldItem } from "./AdminFieldItem";

export const dynamic = "force-dynamic";

export default async function AdminFieldsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;

  const fieldsData = await prisma.field.findMany({
    where: status ? { status: status as any } : undefined,
    include: { 
      agent: true,
      observations: {
        include: { agent: true },
        orderBy: { createdAt: "desc" },
      }
    },
    orderBy: { createdAt: "desc" },
  });

  const filterOptions = [
    { label: "All", value: "" },
    { label: "Active", value: "Active" },
    { label: "At Risk", value: "AtRisk" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fields Directory</h1>
          <p className="mt-2 text-slate-600">View all registered fields and monitor updates from agents.</p>
        </div>
        <Link href="/admin/fields/new" className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
          Add Field
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {filterOptions.map((opt) => (
          <Link
            key={opt.value}
            href={opt.value ? `/admin/fields?status=${opt.value}` : "/admin/fields"}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
              (status === opt.value || (!status && !opt.value))
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {fieldsData.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No fields recorded yet.
          </div>
        ) : (
          fieldsData.map((field) => (
            <AdminFieldItem key={field.id} field={{
              id: field.id,
              name: field.name,
              cropType: field.cropType,
              stage: field.currentStage,
              status: field.status,
              agentName: field.agent?.name || null,
              observations: field.observations,
            }} />
          ))
        )}
      </div>
    </div>
  );
}
