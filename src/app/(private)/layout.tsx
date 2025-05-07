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
      <footer className="fixed bottom-0 text-muted-foreground py-3 px-4 rounded-xl ">
        ©{new Date().getFullYear()} SOLVUS. Todos os direitos reservados.
      </footer>
    </SidebarProvider>
  );
}
