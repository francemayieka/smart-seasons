import { prisma } from "@/lib/prisma";
import { generateAdminInvite, deleteInvite } from "./actions";
import { CopyButton } from "./CopyButton";

export default async function AdminInvitePage() {
  const invites = await prisma.adminInvite.findMany({
    where: { used: false, expires: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Invites</h1>
          <p className="mt-2 text-slate-600">Generate secure, one-time signup links for new administrators.</p>
        </div>
        <form action={async (formData) => {
          "use server";
          await generateAdminInvite(formData);
        }}>
          <button className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
            Generate New Link
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {invites.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-500">
            No active invite links. Generate one to onboard a new admin.
          </div>
        ) : (
          invites.map((invite) => {
            const signupUrl = `${process.env.NEXTAUTH_URL}/admin-signup/${invite.token}`;
            return (
              <div key={invite.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Invite Link</p>
                  <p className="mt-1 truncate font-mono text-sm text-slate-600">{signupUrl}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Expires {new Date(invite.expires).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CopyButton text={signupUrl} />
                  <form action={async () => {
                    "use server";
                    await deleteInvite(invite.id);
                  }}>
                    <button className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100 transition">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
