import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { DashboardHeader } from "./_components/header";
import { Info } from "lucide-react";
import { getSessionData } from "@/app/(public)/(auth)/admin/login/actions/login-action";
import { SidebarProvider } from "./_components/sidebar";

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
  const adminInfo = await getSessionData();

  if (!adminInfo) {
    return <LoadingState />;
  }

  return (
    <SidebarProvider adminData={adminInfo}>
      <DashboardHeader userData={adminInfo} />
      <div className="bg-primary/80 w-full px-6 py-2 rounded-sm flex items-center gap-2">
        <Info className="size-8 text-secondary hidden md:block" />
        <span className="text-sm text-secondary">
          <strong>TEMOS NOVIDADES PARA VOCÊ</strong>: Agora você tem um
          dashboard mais completo, as conversas ficam registradas e o leads
          também. Consulte seu atendimento em caso de dúvidas.{" "}
          <strong>Equipe SOLVUS</strong>.
        </span>
      </div>
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
