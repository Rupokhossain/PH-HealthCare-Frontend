/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

const RoleGuard = ({ children, roles }: IProps) => {
  const router = useRouter();
  
  // isLoading ব্যবহার করুন (isPending এর পরিবর্তে)
  const { data, isPending, isError } = useGetMe();

  console.log("React Query Status:", { isError, data });

  const user = data?.data;

  // কনসোলে চেক করে দেখুন ডেটা আসছে কিনা
  console.log("RoleGuard User:", user);

      console.log("== RoleGuard Debug ==");
    console.log("isPending:", isPending);
    console.log("isError:", isError);
    console.log("user:", user);
    console.log("user.role:", user?.role);

  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
};

export default RoleGuard;