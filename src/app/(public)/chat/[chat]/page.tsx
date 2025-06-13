"use client";

import { FormEvent, useState } from "react";
import { InitialChat } from "../_components/initial-chat";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetGuestChat } from "@/features/guest-chat/api/use-get-guest-chat";

interface ChatMessage {
  fromChat: boolean;
  message: string;
}

export default function ChatPage() {
  const params = useParams();
  const chatSlug = params.chat as string;

  const { data, isLoading, isError, error } = useGetGuestChat(chatSlug);

  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
        <p>Carregando chat...</p>
      </div>
    );
  }

  if (isError || error || !data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
        <p>Erro ao carregar chat.</p>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setChat((prev) => [
      ...prev,
      {
        fromChat: false,
        message,
      },
    ]);
    if (!chatStarted) setChatStarted(true);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
      {chatStarted ? (
        <div
          className="container mx-auto px-6 py-3 shadow min-h-[70lvh] rounded-lg 
          flex flex-col justify-between gap-4"
        >
          <div className="flex-1 border p-4 rounded-lg">
            {chat.map((c) => (
              <div
                key={c.message}
                className={cn("flex justify-between w-full gap-6 items-start")}
              >
                <Avatar className="size-10">
                  <AvatarFallback>
                    {c.fromChat ? <Sparkles /> : <User />}
                  </AvatarFallback>
                </Avatar>

                <div className={cn("border p-3 w-full rounded-lg")}>
                  {c.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full gap-2 items-center">
            <Input
              placeholder="Digite sua mensagem..."
              className="p-3 bg-muted"
            />
            <Button size={"icon"}>
              <SendHorizonal />
            </Button>
          </div>
        </div>
      ) : (
        <InitialChat
          data={data}
          message={message}
          onSubmit={handleSubmit}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}
