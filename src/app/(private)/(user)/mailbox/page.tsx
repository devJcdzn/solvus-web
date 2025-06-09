import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columns, payments } from "@/features/mailbox/components/columns";
import { DataTable } from "@/features/mailbox/components/data-table";
import { SendHorizonal } from "lucide-react";

export default function MailboxPage() {
  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-semibold">Mensagens</h2>
        <DataTable data={payments} columns={columns} />
        <div className="flex gap-2 w-full items-center">
          <Input placeholder="Digite a mensagem aqui" />
          <Button className="rounded-md">
            Enviar
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
}
