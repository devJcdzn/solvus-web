"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Phone, Send, SendHorizonal } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { InitialChat } from "./_components/initial-chat";

export default function ChatPage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chatStarted) setChatStarted(true);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center max-w-5xl mx-auto px-6 md:px-0">
      {chatStarted ? (
        <p>A mensagem é {message}</p>
      ) : (
        <InitialChat
          message={message}
          onSubmit={handleSubmit}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}
