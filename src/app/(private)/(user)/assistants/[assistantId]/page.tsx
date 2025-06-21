"use client";

import Loading from "@/app/(private)/loading";
import { InitialChat } from "../_components/initial-chat";
import { useGetAssistantChat } from "@/features/assistants/api/use-get-assistant-chat";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal, Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  fromChat: boolean;
  message: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const params = useParams();
  const assId = params.assistantId as string;
  const { data, isLoading, isError, error } = useGetAssistantChat(assId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isSending) return;

    const userMessage: ChatMessage = {
      fromChat: false,
      message: message.trim(),
      timestamp: new Date(),
    };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setIsSending(true);

    if (!chatStarted) setChatStarted(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        fromChat: true,
        message:
          "Esta é uma resposta simulada do assistente. Em uma implementação real, você faria uma chamada para a API do seu chatbot.",
        timestamp: new Date(),
      };
      setChat((prev) => [...prev, aiMessage]);
      setIsSending(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || !data) return <Loading />;

  if (isError || error || !data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
        <p>Erro ao carregar chat.</p>
      </div>
    );
  }

  return (
    <div className="flex py-8 flex-col h-screen items-center justify-center w-full max-w-4xl mx-auto px-6 md:px-0">
      {chatStarted ? (
        <div
          className="container mx-auto px-6 py-3 shadow min-h-[70lvh] rounded-lg 
          flex flex-col justify-between gap-4 bg-background"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-3 pb-3 border-b">
            <Avatar className="size-8">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_S3_FILES}/${data.agente.avatar}`}
                className="object-contain"
              />
              <AvatarFallback>
                <Sparkles className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{data.agente.nome}</h3>
              {/* <p className="text-sm text-muted-foreground">Online</p> */}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto max-h-[50vh] p-4 space-y-4">
            {chat.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Sparkles className="size-8 mx-auto mb-2 opacity-50" />
                <p>Inicie uma conversa enviando uma mensagem</p>
              </div>
            ) : (
              chat.map((c, index) => (
                <div
                  key={`${c.message}-${index}`}
                  className={cn(
                    "flex gap-3 items-start",
                    c.fromChat ? "justify-start" : "justify-end"
                  )}
                >
                  {c.fromChat && (
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarFallback>
                        <Sparkles className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3 relative",
                      c.fromChat
                        ? "bg-muted border"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {c.message}
                    </p>
                    <span
                      className={cn(
                        "text-xs mt-1 block",
                        c.fromChat
                          ? "text-muted-foreground"
                          : "text-primary-foreground/70"
                      )}
                    >
                      {formatTime(c.timestamp)}
                    </span>
                  </div>

                  {!c.fromChat && (
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarFallback>
                        <User className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isSending && (
              <div className="flex gap-3 items-start justify-start">
                <Avatar className="size-8 flex-shrink-0">
                  <AvatarFallback>
                    <Sparkles className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted border rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full gap-2 items-center pt-3 border-t"
          >
            <Input
              placeholder="Digite sua mensagem..."
              className="p-3 bg-muted"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || isSending}
            >
              <SendHorizonal className="size-4" />
            </Button>
          </form>
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
