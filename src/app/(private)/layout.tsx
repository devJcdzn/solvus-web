import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { DashboardHeader } from "./_components/header";
import { SidebarProvider } from "./_components/sidebar";
import { getSessionData } from "../(public)/(auth)/login/actions/login-action";

export const metadata: Metadata = {
  title: "Dashboard | Solvus",
  description: "Meu Painel Solvus",
};

function LoadingState() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

async function DashboardContent({ children }: { children: ReactNode }) {
  const userInfo = await getSessionData();

  if (!userInfo) {
    return <LoadingState />;
  }

  return (
    <SidebarProvider userData={userInfo}>
      <DashboardHeader userData={userInfo} />
      {children}
      <footer className="mt-4 text-muted-foreground py-3 px-4 rounded-xl">
        ©{new Date().getFullYear()} SOLVUS. Todos os direitos reservados.
      </footer>
    </SidebarProvider>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingState />}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}
