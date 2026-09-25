import DashboardShell from "@/components/dashboard/dashboard-shell";
import RoleGuard from "@/components/auth/role-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
    {/** biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
<DashboardShell role="ADMIN">{children}</DashboardShell>
  </RoleGuard>;
}