"use client";

import Loading from "@/app/(private)/loading";
import { InitialChat } from "../_components/initial-chat";
import { useGetAssistantChat } from "@/features/assistants/api/use-get-assistant-chat";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

interface ChatMessage {
  fromChat: boolean;
  message: string;
}

export default function AssistantPage() {
  const params = useParams();
  const assId = params.assistantId as string;
  const { data, isLoading, isError, error } = useGetAssistantChat(assId);

  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

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

  if (isLoading || !data) return <Loading />;

  if (isError || error || !data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
        <p>Erro ao carregar chat.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full max-w-4xl mx-auto px-6 md:px-0">
      {chatStarted ? (
        <p>{message}</p>
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
