import DashboardShell from "@/components/dashboard/dashboard-shell";
import RoleGuard from "@/components/modules/auth/role-guard";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard roles={["PATIENT"]}>
    {/** biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
<DashboardShell role="PATIENT">{children}</DashboardShell>
  </RoleGuard>;
}