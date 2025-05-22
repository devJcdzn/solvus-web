"use client";

import { useGetContacts } from "@/features/contacts/api/use-get-contacts";
import Loading from "../../loading";
import { AssistantCard } from "../assistants/_components/assistant-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { normalizarNumero } from "@/lib/utils";

export default function LeadsPage() {
  const { data, isLoading } = useGetContacts();

  if (!data || isLoading) return <Loading />;

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 gap-6">
        {data?.chats && Object.keys(data.chats).length > 0 ? (
          Object.entries(data.chats).map(([assistantName, chats]) =>
            Array.isArray(chats) && chats.length > 0 ? (
              <div key={assistantName}>
                <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {chats.map((chat) => {
                    const firstWord = chat.nome?.split("-")[0]?.trim() || "";
                    const fallback = /^\d/.test(firstWord)
                      ? chat.nome?.split("-")[1]?.trim()[0] || ""
                      : firstWord[0] || "";

                    return (
                      <div
                        key={chat.numero}
                        className="px-3 py-3 border-b flex gap-2"
                      >
                        <Avatar className="size-10">
                          <AvatarImage src={chat.foto || ""} />
                          <AvatarFallback>{fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="text-sm font-semibold">{chat.nome}</h5>
                          <p className="text-muted-foreground text-sm leading-3">
                            {normalizarNumero(chat.numero)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null
          )
        ) : (
          <div className="px-3 py-3 text-muted-foreground text-center">
            Nenhuma conversa disponível
          </div>
        )}
      </div>
    </div>
  );
}
