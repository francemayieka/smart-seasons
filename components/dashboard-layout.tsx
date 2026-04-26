"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartIcon, FieldIcon, UserIcon, LeafIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
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
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <LeafIcon className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">ShambaRecords</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600/80">{roleLabel}</p>
        </div>

        <nav className="flex flex-col gap-1.5 px-4 py-2">
          {links.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin' && link.href !== '/agent');
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className={`flex items-center justify-center transition-colors ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
                  {link.icon}
                </div>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-100 p-4 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 border border-slate-200/50">
                <UserIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">{session?.user?.name || "User"}</p>
                <p className="truncate text-[10px] text-slate-400 uppercase tracking-widest font-black leading-tight">{session?.user?.role}</p>
              </div>
            </div>
            <LogoutButton 
              showText={false}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm" 
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-72">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <LeafIcon className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">ShambaRecords</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1">
          <div className="h-full px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

