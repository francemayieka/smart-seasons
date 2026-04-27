import Link from "next/link";
import { LeafIcon } from "@/components/ui/icons";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-emerald-600 text-white shadow-xl shadow-emerald-200">
              <LeafIcon className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-emerald-900 font-poppins">SmartSeasons</span>
          </Link>
        </div>
        
        <div className="bg-white py-10 px-6 shadow-2xl shadow-slate-200 sm:rounded-[2.5rem] sm:px-12 border border-slate-100">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </main>
  );
}
