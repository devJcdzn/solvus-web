import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin - Solvus",
  description: "Gerenciar painel de admin da Solvus",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
