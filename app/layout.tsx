import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "SmartSeason Field Monitoring",
  description: "Manage crop progress, field updates and season status with a simple dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-950 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
