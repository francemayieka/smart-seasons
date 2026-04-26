import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AgentFieldItem } from "./AgentFieldItem";
import Link from "next/link";
import { getAgentFields } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";

export default async function AgentFieldsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ status?: string, page?: string }> 
}) {
  const { status, page } = await searchParams;
  const currentPage = parseInt(page || "1");
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div className="p-8 text-center text-red-500">Not authenticated.</div>;
  }

  const { fields: fieldsData, totalPages } = await getAgentFields(session.user.id, status, currentPage);

  const filterOptions = [
    { label: "All", value: "" },
    { label: "Active", value: "Active" },
    { label: "At Risk", value: "AtRisk" },
    { label: "Completed", value: "Completed" },
  ];

  return (
    <div className="mx-auto max-w-6xl w-full">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Fields</h1>
          <p className="mt-2 text-slate-600">View and update your assigned fields.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-nowrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit max-w-full overflow-x-auto no-scrollbar">
        {filterOptions.map((opt) => (
          <SmartPrefetch key={opt.value} type="fields" className="contents">
            <Link
              key={opt.value}
              href={opt.value ? `/agent/fields?status=${opt.value}` : "/agent/fields"}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap ${
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
            You have no assigned fields yet.
          </div>
        ) : (
          <>
            {fieldsData.map(field => (
              <AgentFieldItem key={field.id} field={{
                id: field.id,
                name: field.name,
                cropType: field.cropType,
                stage: field.currentStage,
                status: field.status,
                observations: field.observations,
              }} />
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/agent/fields?${status ? `status=${status}&` : ""}page=${p}`}
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
