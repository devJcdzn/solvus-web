"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetLeads } from "@/features/leads/api/use-get-leads";
import { columns, campaigns } from "@/features/mailbox/components/columns";
import { DataTable } from "@/features/mailbox/components/data-table";
import { Plus, SendHorizonal } from "lucide-react";
import Loading from "../../loading";

export default function MailboxPage() {
  // const { data, isLoading } = useGetLeads();

  // if (isLoading || !data) return <Loading />;

  // const contacts = Object.values(data.conversas).flat();

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 gap-6">
        <header className="py-2 flex items-center w-full justify-between">
          <h2 className="text-2xl font-semibold">Campanhas</h2>
          <Button className="rounded-md bg-purple-700">
            <Plus />
            Nova Campanha
          </Button>
        </header>
        <DataTable data={campaigns} columns={columns} />
        {/* <div className="flex flex-col md:flex-row gap-2 w-full items-center">
          <Input placeholder="Digite a mensagem aqui" />
          <Button className="rounded-md w-full md:w-auto">
            Enviar
            <SendHorizonal />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
