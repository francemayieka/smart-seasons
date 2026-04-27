import { prisma } from "@/lib/prisma";
import { AdminSignupForm } from "./AdminSignupForm";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";

export const dynamic = "force-dynamic";

export default async function AdminSignupPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const invite = await prisma.adminInvite.findUnique({
    where: { token, used: false, expires: { gt: new Date() } },
  });

  if (!invite) {
    return (
      <AuthShell 
        title="Invite Invalid or Expired" 
        subtitle="This link is no longer valid. Registration requires a fresh invite."
      >
        <div className="text-center">
          <Link href="/" className="font-semibold text-emerald-600 hover:text-emerald-500">
            Return to Home
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell 
      title="Admin Registration" 
      subtitle="Complete your profile to access the management portal."
    >
      <AdminSignupForm token={token} />
    </AuthShell>
  );
}
