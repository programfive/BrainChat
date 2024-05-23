"use client";
import { MobileFooter } from "./mobile-footer";
import { useCurrentUser } from "@/hooks/use-current-user";

interface SidebarProps {
  children: React.ReactNode;
}

export function SideBar({ children }: SidebarProps) {
  const currentUser = useCurrentUser();
  return (
    <div className="h-full">
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
