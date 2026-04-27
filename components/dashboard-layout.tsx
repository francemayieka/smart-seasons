"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartIcon, FieldIcon, UserIcon, LeafIcon } from "@/components/ui/icons";
import { LogoutButton } from "@/components/logout-button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SmartPrefetch } from "@/components/smart-prefetch";
import { MobileMenuToggle } from "@/components/ui/mobile-menu-toggle";
import { revalidateCoreData } from "@/lib/revalidate-action";
import { useEffect, useCallback } from "react";

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
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Real-time Sync Logic
  const syncData = useCallback(() => {
    if (status === "authenticated") {
      router.refresh();
      console.log("Background sync: Data refreshed from server.");
    }
  }, [status, router]);

  // Smart Revalidation on login
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const hasRevalidated = sessionStorage.getItem(`revalidated-${session.user.id}`);
      if (!hasRevalidated) {
        revalidateCoreData(session.user.id).then(() => {
          sessionStorage.setItem(`revalidated-${session.user.id}`, "true");
          syncData();
        });
      }
    }
  }, [status, session?.user?.id, syncData]);

  // Sync on Focus & Heartbeat
  useEffect(() => {
    if (status !== "authenticated") return;

    // Focus Sync: Refresh when user returns to tab
    window.addEventListener("focus", syncData);
    
    // Heartbeat Sync: Refresh every 10 seconds for active users
    const heartbeat = setInterval(syncData, 10000);

    return () => {
      window.removeEventListener("focus", syncData);
      clearInterval(heartbeat);
    };
  }, [status, syncData]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 font-roboto">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent shadow-lg shadow-emerald-100"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-roboto max-w-full overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-emerald-950/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-emerald-800 bg-emerald-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-xl flex flex-col h-full`}
      >
        <div className="flex h-20 items-center justify-between border-b border-emerald-800 px-6 shrink-0">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-900 shadow-lg">
              <LeafIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tighter text-white font-poppins uppercase">SMARTSEASONS</span>
          </Link>
          <MobileMenuToggle 
            isOpen={true} 
            onClick={() => setIsSidebarOpen(false)} 
            variant="glass" 
            className="lg:hidden"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-6 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/80 font-poppins">Workspace: {roleLabel}</p>
          </div>

          <nav className="flex flex-col gap-2 px-4 pb-24">
            {links.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin' && link.href !== '/agent');
              return (
                <SmartPrefetch 
                  key={link.name} 
                  type={link.href.includes('agents') ? 'agents' : link.href.includes('fields') ? 'fields' : 'dashboard'}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                        : "text-emerald-100/60 hover:bg-emerald-800/50 hover:text-white"
                    }`}
                  >
                    <div className={`flex items-center justify-center transition-colors ${isActive ? "text-white" : "text-emerald-400"}`}>
                      {link.icon}
                    </div>
                    <span className="font-roboto">{link.name}</span>
                  </Link>
                </SmartPrefetch>
              );
            })}
          </nav>
        </div>

        <div className="shrink-0 border-t border-emerald-800 p-6 bg-emerald-950 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-emerald-300 border border-emerald-700/50 shadow-inner">
                <UserIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white font-poppins">{session?.user?.name || "User"}</p>
                <p className="truncate text-[10px] text-emerald-400/70 uppercase tracking-widest font-bold font-roboto">{session?.user?.role}</p>
              </div>
            </div>
            <LogoutButton 
              showText={false}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-700 bg-emerald-800 text-emerald-400 hover:bg-red-950 hover:text-red-400 hover:border-red-900 transition-all shadow-lg cursor-pointer" 
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-72 w-full max-w-full overflow-x-hidden">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-emerald-800 bg-emerald-900 px-5 lg:hidden shadow-md overflow-hidden">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-emerald-900 shadow-lg">
              <LeafIcon className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tighter text-white font-poppins uppercase text-sm">SmartSeasons</span>
          </Link>
          <MobileMenuToggle 
            isOpen={isSidebarOpen} 
            onClick={() => setIsSidebarOpen(true)} 
            variant="emerald" 
          />
        </header>

        <main className="flex-1 w-full min-w-0 overflow-x-hidden flex flex-col">
          <div className="flex-1 w-full max-w-full px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            {children}
          </div>
          
          <footer className="mt-auto w-full px-6 py-8 sm:px-8 lg:px-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <LeafIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-tighter uppercase font-poppins">SMARTSEASONS</span>
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-slate-500">
                &copy; {new Date().getFullYear()} All rights reserved. <span className="mx-2 text-slate-200">|</span> Proudly crafted by <span className="font-bold text-emerald-600">France</span>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
