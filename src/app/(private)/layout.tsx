import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardHeader } from "./_components/header";
import { SidebarProvider } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Solvus",
  description: "Meu Painel Solvus",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardHeader />
      {children}
    </SidebarProvider>
  );
}
