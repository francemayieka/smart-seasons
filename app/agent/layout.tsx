import { DashboardLayout } from "@/components/dashboard-layout";
import { ChartIcon, FieldIcon } from "@/components/ui/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const agentLinks = [
  { name: "Dashboard", href: "/agent", icon: <ChartIcon className="h-5 w-5" /> },
  { name: "My Fields", href: "/agent/fields", icon: <FieldIcon className="h-5 w-5" /> },
];

export default async function AgentLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.forcePasswordChange) {
    redirect("/auth/new-password");
  }

  return (
    <DashboardLayout links={agentLinks} roleLabel="Field Agent">
      {children}
    </DashboardLayout>
  );
}
