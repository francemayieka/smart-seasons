import Link from "next/link";
import { LeafIcon } from "@/components/ui/icons";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <LeafIcon className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">SmartSeasons</span>
        </Link>
      </div>
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">{title}</h1>
          <p className="mt-2 text-slate-500 font-medium">{subtitle}</p>
        </div>

        {children}
      </div>
    </main>
  );
}
