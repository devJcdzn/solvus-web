"use client";

import type React from "react";
import { Contact } from "../types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetChatData } from "@/features/contacts/api/use-get-chat-data";
import { transformChatData } from "@/lib/utils";

interface ChatAreaProps {
  contact: Contact;
  onBack: () => void;
  isMobile: boolean;
}

export const ChatArea = ({ contact, onBack, isMobile }: ChatAreaProps) => {
  const { data, isLoading } = useGetChatData(contact.id);
  const parsedChats = data && transformChatData(data);
  console.log(parsedChats);

  const firstWord = contact.name?.split("-")[0]?.trim() || "";
  const fallback = /^\d/.test(firstWord)
    ? contact.name?.split("-")[1]?.trim()[0] || ""
    : firstWord[0] || "";

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    };

    // Scroll immediately
    scrollToBottom();

    // Scroll again after a short delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [parsedChats?.messages]);

  // if (!data || isLoading) {};

  // const formattedContact = transformChatData(data);

  // console.log(formattedContact);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-3 bg-[#202c33]">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="text-[#aebac1]"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar || undefined} alt={contact.name} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-[#e9edef] font-medium">{contact.name}</h2>
          <p className="text-xs text-[#8696a0]">Dados recentes do chat</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-[#0b141a] bg-repeat"
        style={{ backgroundSize: "360px" }}
      >
        <div className="flex flex-col gap-2">
          {parsedChats && parsedChats.messages.length > 0 ? (
            <>
              {(parsedChats?.messages || contact.messages).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[65%] rounded-lg px-3 py-2 ${
                      msg.sender === "me"
                        ? "bg-[#005c4b] text-white"
                        : "bg-[#202c33] text-[#e9edef]"
                    }`}
                  >
                    {msg.senderName && (
                      <p className="text-xs font-medium text-[#00a884] mb-1">
                        {msg.senderName}
                      </p>
                    )}
                    <p className="text-sm">
                      {msg.content || "Mensagem de mídia"}
                    </p>
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span className="text-[10px] text-[#8696a0]">
                        {msg.timestamp}
                      </span>
                      {msg.sender === "me" && (
                        <span className="text-[#8696a0]">
                          {msg.status === "read" ? (
                            <svg
                              viewBox="0 0 18 18"
                              width="12"
                              height="12"
                              fill="#53bdeb"
                            >
                              <path d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                            </svg>
                          ) : msg.status === "delivered" ? (
                            <svg
                              viewBox="0 0 18 18"
                              width="12"
                              height="12"
                              fill="#8696a0"
                            >
                              <path d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 12 11"
                              width="12"
                              height="11"
                              fill="#8696a0"
                            >
                              <path d="M11.1534 0.698215L10.3559 0.0800996C10.1299 -0.0876029 9.82477 -0.0203383 9.68093 0.233639L4.35477 8.11408L2.04383 6.04555C1.81786 5.84354 1.51146 5.86726 1.31601 6.09836L0.690228 6.81661C0.494779 7.04771 0.519249 7.3618 0.745216 7.56381L4.02502 10.5111C4.27348 10.7337 4.64672 10.7337 4.89518 10.5111C5.01252 10.4059 11.3219 1.73761 11.3219 1.73761C11.4658 1.48361 11.3795 1.16303 11.1534 0.698215Z"></path>
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="place-items-center">
              <p className="text-muted-foreground">Nenhuma mensagem desta conversa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
