import RoleGuard from "@/components/modules/auth/role-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>{children}</RoleGuard>;
}