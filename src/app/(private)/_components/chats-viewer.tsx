import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { normalizarNumero } from "@/lib/utils";
import { ChatContact } from "../(user)/leads/types";
import { Card } from "@/components/ui/card";

export const ChatViewer = ({
  data,
}: {
  data: {
    teamData: {
      primaryColor: string;
    };
    leads_length: number;
    chats: {
      [key: string]: ChatContact[];
    };
  };
}) => {
  return (
    <Card className="flex flex-col border-none p-0 gap-0 max-h-[60vh] overflow-auto">
      <header
        className="px-2 py-3 w-full sticky top-0 z-30"
        style={{ backgroundColor: data.teamData.primaryColor }}
      >
        <h4 className="text-white font-semibold">Conversas</h4>
      </header>

      <div className="flex flex-col">
        {data?.chats && Object.keys(data.chats).length > 0 ? (
          Object.entries(data.chats).map(([assistantName, chats]) =>
            Array.isArray(chats) && chats.length > 0 ? (
              <div key={assistantName}>
                <div
                  className="px-3 py-2 bg-muted flex items-center justify-between font-medium 
                        text-sm text-muted-foreground"
                >
                  <p>{assistantName}</p>
                  <p>{data.leads_length} Conversas</p>
                </div>
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
            ) : null
          )
        ) : (
          <div className="px-3 py-3 text-muted-foreground text-center">
            Nenhuma conversa disponível
          </div>
        )}
      </div>
    </Card>
  );
};
