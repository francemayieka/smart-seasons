"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartIcon, FieldIcon, UserIcon, LeafIcon } from "@/components/ui/icons";
import { LogoutButton } from "@/components/logout-button";

import { useSession } from "next-auth/react";

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export function DashboardLayout({
  children,
  links,
  roleLabel,
}: {
  children: React.ReactNode;
  links: NavLink[];
  roleLabel: string;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <LeafIcon className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-tight text-slate-900">ShambaRecords</span>
        </div>
        <div className="px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{roleLabel}</p>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-2">
          {links.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin' && link.href !== '/agent');
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className={`flex items-center justify-center ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
                  {link.icon}
                </div>
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-slate-100 p-4 bg-white">
          <div className="flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <UserIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">{session?.user?.name || "User"}</p>
                <p className="truncate text-[10px] text-slate-500 uppercase tracking-wider font-bold">{session?.user?.role}</p>
              </div>
            </div>
            <LogoutButton 
              showText={false}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition shadow-sm" 
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="h-full px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
