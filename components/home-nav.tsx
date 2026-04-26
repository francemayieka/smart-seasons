"use client";

import { useState } from "react";
import Link from "next/link";
import { LeafIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { LogoutButton } from "@/components/logout-button";

export function HomeNav({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-900 shadow-xl transition-transform group-hover:rotate-12">
            <LeafIcon className="h-6 w-6" />
          </div>
          <span className="text-2xl font-semibold tracking-tighter font-poppins uppercase text-white">SmartSeasons</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-all font-poppins uppercase"
              >
                Dashboard
              </Link>
              <LogoutButton 
                showText={false}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-emerald-900 transition-all cursor-pointer" 
              />
            </div>
          ) : (
            <Link 
              href="/auth/signin"
              className="rounded-full bg-emerald-400 px-8 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-white shadow-xl transition-all font-poppins uppercase cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Burger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white md:hidden hover:bg-white/20 transition-all"
        >
          {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-emerald-950 p-6 md:hidden animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-900 shadow-lg">
                  <LeafIcon className="h-5 w-5" />
                </div>
                <span className="text-xl font-semibold tracking-tighter font-poppins uppercase text-white">SmartSeasons</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {session ? (
                <>
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-2xl bg-white p-5 text-lg font-bold text-emerald-900 shadow-xl"
                  >
                    Dashboard
                  </Link>
                  <div className="mt-4 border-t border-white/10 pt-8">
                    <div className="flex items-center justify-between bg-white/5 rounded-3xl p-6 border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-400">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-white">{session.user.name}</p>
                          <p className="text-xs text-emerald-400 uppercase tracking-widest">{session.user.role}</p>
                        </div>
                      </div>
                      <LogoutButton 
                        showText={false}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all" 
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Link 
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-2xl bg-emerald-400 p-5 text-lg font-bold text-emerald-900 shadow-xl"
                >
                  Get Started
                </Link>
              )}
            </div>

            <div className="mt-auto py-12 border-t border-white/5 text-center">
              <p className="text-sm font-semibold text-emerald-100/30 font-poppins uppercase tracking-[0.2em]">
                Proudly crafted by Francis
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
