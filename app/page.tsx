import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/agent");
    }
  }

  // Landing page for unauthenticated users
  return (
    <main className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Field monitoring for the growing season.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          A clean crop progress dashboard with role-based access, agent updates, crop stage status, and rule-driven risk predictions.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        <a href="/auth/signup" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-center transition hover:border-emerald-300 hover:bg-emerald-50">
          Sign up as Admin
        </a>
        <a href="/auth/signup" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-center transition hover:border-emerald-300 hover:bg-emerald-50">
          Sign up as Agent
        </a>
      </div>
    </main>
  );
}
