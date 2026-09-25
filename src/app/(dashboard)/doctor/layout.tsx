import DashboardShell from "@/components/dashboard/dashboard-shell";
import RoleGuard from "@/components/auth/role-guard";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard roles={["DOCTOR"]}>
    {/** biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
<DashboardShell role="DOCTOR">{children}</DashboardShell>
  </RoleGuard>;
}