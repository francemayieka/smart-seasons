import { DashboardLayout } from "@/components/dashboard-layout";
import { ChartIcon, UserIcon, FieldIcon } from "@/components/ui/icons";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: <ChartIcon className="h-5 w-5" /> },
  { name: "Agents", href: "/admin/agents", icon: <UserIcon className="h-5 w-5" /> },
  { name: "Fields", href: "/admin/fields", icon: <FieldIcon className="h-5 w-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout links={adminLinks} roleLabel="Coordinator">
      {children}
    </DashboardLayout>
  );
}
