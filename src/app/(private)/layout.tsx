import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardSidebar } from "./_components/sidebat";

export const metadata: Metadata = {
  title: "Dashboard | Solvus",
  description: "Meu Painel Solvus",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-secondary">
      <DashboardSidebar />
      {children}
    </main>
  );
}
