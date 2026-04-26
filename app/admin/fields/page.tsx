import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminFieldItem } from "./AdminFieldItem";
import { getAdminFields } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";

export default async function AdminFieldsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ status?: string, page?: string }> 
}) {
  const { status, page } = await searchParams;
  const currentPage = parseInt(page || "1");

  const { fields: fieldsData, totalPages } = await getAdminFields(status, currentPage);

  const filterOptions = [
    { label: "All", value: "" },
    { label: "Active", value: "Active" },
    { label: "At Risk", value: "AtRisk" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fields Directory</h1>
          <p className="mt-2 text-slate-600">View all registered fields and monitor updates from agents.</p>
        </div>
        <Link href="/admin/fields/new" className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
          Add Field
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-nowrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit max-w-full overflow-x-auto no-scrollbar">
        {filterOptions.map((opt) => (
          <SmartPrefetch key={opt.value} type="fields" className="contents">
            <Link
              href={opt.value ? `/admin/fields?status=${opt.value}` : "/admin/fields"}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
                (status === opt.value || (!status && !opt.value))
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {opt.label}
            </Link>
          </SmartPrefetch>
        ))}
      </div>

      <div className="space-y-6">
        {fieldsData.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No fields recorded yet.
          </div>
        ) : (
          <>
            {fieldsData.map((field) => (
              <AdminFieldItem key={field.id} field={{
                id: field.id,
                name: field.name,
                cropType: field.cropType,
                stage: field.currentStage,
                status: field.status,
                agentName: field.agent?.name || null,
                observations: field.observations,
              }} />
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/admin/fields?${status ? `status=${status}&` : ""}page=${p}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                      currentPage === p
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
