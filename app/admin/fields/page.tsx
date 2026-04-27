import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminFieldItem } from "./AdminFieldItem";
import { getAdminFields } from "@/lib/data";
import { SmartPrefetch } from "@/components/smart-prefetch";
import { PageHeader, DashboardContainer, HybridGrid } from "@/components/ui/dashboard-ui";

export default async function AdminFieldsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ status?: string, page?: string }> 
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

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
    <DashboardContainer>
      <PageHeader 
        title="Fields Directory" 
        description="View all registered fields and monitor updates from agents."
        action={{ label: "Add Field", href: "/admin/fields/new" }}
      />

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-nowrap gap-1.5 sm:gap-4 md:gap-6 p-1.5 bg-slate-100/50 rounded-2xl w-fit max-w-full overflow-x-auto no-scrollbar scroll-smooth shadow-inner border border-slate-200/50">
        {filterOptions.map((opt) => (
          <SmartPrefetch key={opt.value} type="fields" className="contents">
            <Link
              href={opt.value ? `/admin/fields?status=${opt.value}` : "/admin/fields"}
              className={`px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
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

      <HybridGrid>
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
      </HybridGrid>
    </DashboardContainer>
  );
}
