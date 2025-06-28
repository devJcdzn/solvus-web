"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Lead = {
  remoteJid: string;
  nome: string;
  numero: string;
};

export type Campaign = {
  id: string;
  nome: string;
  tipo: string;
  status: string;
  destinatarios: number;
  data: string;
};

export const campaigns: Campaign[] = [
  {
    id: "1",
    nome: "Campanha de Boas-vindas",
    tipo: "Marketing",
    status: "Enviada",
    destinatarios: 150,
    data: "2024-01-15",
  },
  {
    id: "2",
    nome: "Promoção Black Friday",
    tipo: "Vendas",
    status: "Agendada",
    destinatarios: 300,
    data: "2024-01-10",
  },
  {
    id: "3",
    nome: "Newsletter Semanal",
    tipo: "Newsletter",
    status: "Rascunho",
    destinatarios: 75,
    data: "2024-01-20",
  },
];

const statusStyles: Record<string, string> = {
  "Enviada": "bg-emerald-200/80 text-emerald-900",
  "Rascunho": "bg-gray-200/80 text-gray-900",
  "Agendada": "bg-blue-200/80 text-blue-900",
  "Pausada": "bg-yellow-200/80 text-yellow-900",
  "Ativa": "bg-green-200/80 text-green-900",
};

export const columns: ColumnDef<Campaign>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorKey: "nome",
    header: "Nome da Campanha",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge className={cn(statusStyles[status] || "bg-gray-200/80 text-gray-900")}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "destinatarios",
    header: "Destinatários",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
];
