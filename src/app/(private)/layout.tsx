import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardHeader } from "./_components/header";
import { SidebarProvider } from "./_components/sidebar";
import { getSessionData } from "../(public)/(auth)/login/actions/login-action";

export const metadata: Metadata = {
  title: "Dashboard | Solvus",
  description: "Meu Painel Solvus",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const userInfo = await getSessionData()
  console.log({userInfo})

  if(!userInfo) return null;

  return (
    <SidebarProvider userData={userInfo}>
      <DashboardHeader />
      {children}
      <footer className="sticky bottom-0 text-muted-foreground py-3 px-4 rounded-xl ">
        ©{new Date().getFullYear()} SOLVUS. Todos os direitos reservados.
      </footer>
    </SidebarProvider>
  );
}
