import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    } else if (session.user.role === "AGENT") {
      redirect("/agent");
    }
    // If session exists but role is invalid/missing, stay on landing page
    // or we could show a "pending approval" message.
  }

  // Landing page for unauthenticated users
  return (
    <div className="relative isolate min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
              <span className="font-semibold text-emerald-600">New Feature</span>
              <span className="h-4 w-px bg-slate-900/10"></span>
              <span className="flex items-center gap-x-1">
                AI Risk Assessment
              </span>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-black tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
            Empowering <span className="text-emerald-600">Smart</span> Decisions in the Field.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
            The next-generation field monitoring platform. Track crop progress, manage field agents, and predict risks with a beautiful, role-based dashboard.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-x-6 gap-y-4">
            <a
              href="/auth/signup"
              className="w-full sm:w-auto rounded-2xl bg-emerald-600 px-8 py-4 text-center text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Started as Admin
            </a>
            <a
              href="/auth/signup"
              className="w-full sm:w-auto rounded-2xl bg-white border border-slate-200 px-8 py-4 text-center text-sm font-bold text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Join as Field Agent <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-x-6 text-sm font-semibold text-slate-400">
            <span>Built for scale</span>
            <span>&bull;</span>
            <span>Secure data</span>
            <span>&bull;</span>
            <span>Offline-first</span>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-md">
            <div className="glass rounded-[2rem] p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl"></div>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">SR</div>
                    <div className="h-3 w-32 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="h-40 w-full bg-slate-50 rounded-2xl border border-dashed border-slate-200"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-emerald-50 rounded-2xl"></div>
                    <div className="h-20 bg-slate-50 rounded-2xl"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-100 to-emerald-300 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}
