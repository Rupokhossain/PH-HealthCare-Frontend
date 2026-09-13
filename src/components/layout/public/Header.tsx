"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const {mutate: logout} = useLogout();
  const queryClient = useQueryClient();


  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Ta ta", 
          description: "Logged out success",
          type: "success",
        });
        queryClient.removeQueries({queryKey: ["user"]})
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something Went Wrong",
          type: "error",
        })
      }
    })
  }

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span>PH Healthcare</span>
        </div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button
            onClick={handleLogout}
              variant="destructive"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
