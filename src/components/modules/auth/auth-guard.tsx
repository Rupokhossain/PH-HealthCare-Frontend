/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMe();

  // data?.data অথবা data
  const user = data?.data || data;

  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      router.replace("/login");
    }
  }, [isLoading, isError, user, router]);

  if (isLoading) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  return <>{children}</>;
};

export default AuthGuard;