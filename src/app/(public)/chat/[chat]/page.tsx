"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { InitialChat } from "../_components/initial-chat";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal, Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetGuestChat } from "@/features/guest-chat/api/use-get-guest-chat";
import { useSendMessage } from "@/features/guest-chat/conversation/use-send-message";
import { Daum } from "@/features/guest-chat/conversation/types";

interface ChatMessage {
  fromChat: boolean;
  message: string;
  timestamp: Date;
}

export default function ChatPage() {
  const params = useParams();
  const chatSlug = params.chat as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useGetGuestChat(chatSlug);
  const { mutate, isPending } = useSendMessage();

  const [chatStarted, setChatStarted] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [conversation, setConversation] = useState<Daum[]>([]);

  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState<string | null>(null);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    // If conversation exists, start chat and set threadId
    if (conversation && conversation.length > 0) {
      setChatStarted(true);
      setThreadId(conversation[conversation.length - 1].thread_id || null);
    }
  }, [conversation]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isPending) return;

    const userMessage: ChatMessage = {
      fromChat: false,
      message: message.trim(),
      timestamp: new Date(),
    };

    const sendMessageData = {
      message: userMessage.message,
      assistantId: data.agente.ass_id,
      sk: data.agente.sk,
      ...(threadId ? { thread_id: threadId } : {}),
    };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");

    mutate(sendMessageData, {
      // The response.data is an array of Daum objects (see types). Each Daum has a content array, where each content has a text.value.
      // To add the assistant's reply to the chat, extract the text.value from the first Daum's content.
      onSuccess: (response) => {
        setConversation(response[0].data);
        // Defensive: check if response.data[0] and its content exist
        const firstDaum = response[0].data[0];
        const assistantMessage =
          firstDaum && firstDaum.content && firstDaum.content[0]
            ? firstDaum.content[0].text.value
            : "";
        if (assistantMessage) {
          setChat((prev) => [
            ...prev,
            {
              fromChat: true,
              message: assistantMessage,
              timestamp: new Date(),
            },
          ]);
        }
        // Update threadId from the first message in the response
        if (firstDaum && firstDaum.thread_id) {
          setThreadId(firstDaum.thread_id);
        }
      },
    });

    if (!chatStarted) setChatStarted(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
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
            {isPending && (
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
              disabled={isPending}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || isPending}
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
