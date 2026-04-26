import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LeafIcon } from "@/components/ui/icons";
import { HomeNav } from "@/components/home-nav";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col bg-emerald-900 text-white font-roboto selection:bg-emerald-500/30 overflow-hidden relative">
      {/* Organic Background Patterns */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-950/20 blur-[100px] rounded-full pointer-events-none" />
      
      <HomeNav session={session} />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-32 lg:items-center">
            <div className="max-w-2xl relative z-20">
              <div className="inline-flex items-center gap-2 mb-6 text-emerald-400 font-bold tracking-[0.3em] uppercase text-xs">
                <span className="h-px w-8 bg-emerald-400" />
                Farming Is Our Business
              </div>
              <h1 className="text-[2.6rem] leading-[0.9] font-semibold tracking-tight font-poppins sm:text-7xl lg:text-9xl uppercase text-white drop-shadow-sm">
                AGRICULTURE
              </h1>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-emerald-300 font-poppins uppercase tracking-wider">
                Magic in the field
              </h2>
              
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-emerald-50/70 font-roboto max-w-lg">
                The next-generation field monitoring platform designed for African agriculture. Track crop health, manage field operations, and secure your harvest with data-driven magic.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/auth/signup"
                  className="w-full sm:w-auto rounded-full bg-emerald-400 px-10 py-4 text-center text-base font-semibold text-emerald-900 shadow-2xl hover:bg-white hover:scale-105 transition-all font-poppins uppercase"
                >
                  Begin Journey
                </Link>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto rounded-full bg-white/10 border border-white/20 px-10 py-4 text-center text-base font-semibold text-white hover:bg-white hover:text-emerald-900 transition-all font-poppins uppercase"
                >
                  Access Portal
                </Link>
              </div>
            </div>

            <div className="mt-16 lg:mt-0 relative flex justify-center lg:justify-end z-10">
              {/* Main Image with Dotted Circle Mask */}
              <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-[-15px] sm:inset-[-20px] rounded-full border-4 border-dashed border-emerald-400/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-0 rounded-full border-4 sm:border-8 border-emerald-950/50 overflow-hidden shadow-2xl bg-emerald-950">
                  <Image 
                    src="/hero-livestock.png" 
                    alt="African livestock" 
                    fill 
                    className="object-cover scale-110"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
              <LeafIcon className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tighter font-poppins uppercase text-white">SmartSeasons</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-semibold text-emerald-100/50 font-poppins uppercase tracking-wider">
              Proudly crafted by France
            </p>
            <p className="mt-1 text-xs text-emerald-900/40 font-medium font-poppins">© 2026 SmartSeasons. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
