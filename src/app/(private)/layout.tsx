import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardHeader } from "./_components/header";
import { DashboardSidebar } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Solvus",
  description: "Meu Painel Solvus",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-secondary">
      <DashboardSidebar />
      <div className="py-6 px-4 w-full">
        <DashboardHeader />
        {children}
      </div>
    </main>
  );
}
