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
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-32 items-center">
        <div className="max-w-2xl relative z-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-6 text-emerald-400 font-bold tracking-[0.3em] uppercase text-xs">
            <span className="h-px w-8 bg-emerald-400" />
            Farming Is Our Business
          </div>
          <h1 className="text-[2.6rem] leading-[0.9] font-semibold tracking-tight font-poppins md:text-7xl lg:text-9xl uppercase text-white drop-shadow-sm">
            AGRICULTURE
          </h1>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-emerald-300 font-poppins uppercase tracking-wider">
            Magic in the field
          </h2>
          
          <p className="mt-8 text-base sm:text-lg leading-relaxed text-emerald-50/70 font-roboto max-w-lg mx-auto md:mx-0">
            The next-generation field monitoring platform designed for African agriculture. Track crop health, manage field operations, and secure your harvest with data-driven magic.
          </p>
          
          <div className="mt-10 flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <Link
              href="/auth/signup"
              className="w-full md:w-auto rounded-full bg-emerald-400 px-10 py-4 text-center text-base font-semibold text-emerald-900 shadow-2xl hover:bg-white hover:scale-105 transition-all font-poppins uppercase"
            >
              Begin Journey
            </Link>
            <Link
              href="/dashboard"
              className="w-full md:w-auto rounded-full bg-white/10 border border-white/20 px-10 py-4 text-center text-base font-semibold text-white hover:bg-white hover:text-emerald-900 transition-all font-poppins uppercase"
            >
              Access Portal
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end z-10">
              {/* Main Image with Dotted Circle Mask */}
              <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                <div className="absolute inset-[-15px] sm:inset-[-20px] rounded-full border-4 border-dashed border-emerald-400/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-0 rounded-full border-4 sm:border-8 border-emerald-950/50 overflow-hidden shadow-2xl bg-emerald-950">
                  <Image 
                    src="/hero-livestock.png" 
                    alt="African livestock" 
                    fill 
                    className="object-cover scale-110"
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 400px, 500px"
                  />
                </div>
                
                {/* Floating Stats Badge */}
                <div className="absolute bottom-[5%] -left-4 sm:bottom-[12%] sm:left-0 rounded-3xl border border-white/20 bg-white/40 p-5 backdrop-blur-xl shadow-2xl animate-bounce-slow z-30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                      <LeafIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest">Live Status</p>
                      <p className="text-xs text-emerald-700 font-bold">Field Healthy</p>
                    </div>
                  </div>
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
