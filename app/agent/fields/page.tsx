import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AgentFieldItem } from "./AgentFieldItem";
import Link from "next/link";

export default async function AgentFieldsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div className="p-8 text-center text-red-500">Not authenticated.</div>;
  }

  const fieldsData = await prisma.field.findMany({
    where: { 
      agentId: session.user.id,
      status: status ? (status as any) : undefined
    },
    include: {
      observations: {
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Fields</h1>
          <p className="mt-2 text-slate-600">View and update your assigned fields.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {filterOptions.map((opt) => (
          <Link
            key={opt.value}
            href={opt.value ? `/agent/fields?status=${opt.value}` : "/agent/fields"}
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
            You have no assigned fields yet.
          </div>
        ) : (
          fieldsData.map(field => (
            <AgentFieldItem key={field.id} field={{
              id: field.id,
              name: field.name,
              cropType: field.cropType,
              stage: field.currentStage,
              status: field.status,
              observations: field.observations,
            }} />
          ))
        )}
      </div>
    </div>
  );
}
