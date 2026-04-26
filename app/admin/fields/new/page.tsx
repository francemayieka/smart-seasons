import { prisma } from "@/lib/prisma";
import { NewFieldForm } from "./NewFieldForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewFieldPage() {
  const activeAgents = await prisma.user.findMany({
    where: { role: "AGENT", agentStatus: "ACTIVE" },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New Field</h1>
          <p className="mt-2 text-slate-600">Register a new field and optionally assign it to an active agent.</p>
        </div>
        <Link href="/admin/fields" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 w-fit">
          &larr; Back to Fields
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <NewFieldForm agents={activeAgents} />
      </div>
    </div>
  );
}
