"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetHistory } from "@/features/history/api/use-get-history";
import Loading from "../../loading";
import Link from "next/link";

export default function HistoryPage() {
  const { data, isLoading } = useGetHistory();

  if (!data || isLoading) return <Loading />;

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border h-screen">
      <h2 className="text-xl md:text-2xl font-semibold">
        Histórico de Conversas
      </h2>
      <div className="px-2 md:px-6 grid grid-cols-1 mt-10">
        <Table className="p-4 border rounded-lg">
          <TableCaption>Histórico de conversas registradas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Thread ID</TableHead>
              <TableHead>Assistente</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead>Acesso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.threads.map((thread) => {
              const mensagem =
                data.mensagem[thread.id]?.conteudo ?? "Sem mensagem";
              return (
                <TableRow key={thread.id}>
                  <TableCell className="font-mono text-xs truncate text-ellipsis">
                    {thread.id}
                  </TableCell>
                  <TableCell>{thread.agente_nome}</TableCell>
                  <TableCell className="">{thread.usuario_id}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {mensagem}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/history/chat-history/${thread.id}`}
                      className="font-semibold underline text-primary"
                    >
                      Acessar
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total de conversas</TableCell>
              <TableCell className="text-right">
                {data.threads.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
