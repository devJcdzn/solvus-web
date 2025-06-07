"use client";

import { useMobile } from "@/hooks/use-is-mobile";
import { cn, transformChatContactsToContacts } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Contact } from "../types";
import { sampleContacts } from "@/lib/const";
import { SidebarChats } from "./sidebar";
import { ChatArea } from "./chat-area";
import { useGetContacts } from "@/features/contacts/api/use-get-contacts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ChatInterface = () => {
  const isMobile = useMobile();

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { data, isLoading } = useGetContacts();
  const parsedContacts = data && transformChatContactsToContacts(data.chats);

  const [showChat, setShowChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const contactId = params.get("chat");
    if (contactId) {
      const contact = parsedContacts?.find((c) => c.id === contactId);
      if (contact) setSelectedContact(contact);
    }
  }, [isLoading]);

  useEffect(() => {
    setContacts(sampleContacts);
  }, []);

  const handleContactSelect = (contact: Contact) => {
    params.set("chat", contact.id);
    replace(`${pathname}?${params.toString()}`);

    setSelectedContact(contact);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToContacts = () => {
    setShowChat(false);
  };

  useEffect(() => {
    if (!isMobile) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-full w-full max-w-[1600px] overflow-hidden bg-[#222e35]">
      {(!showChat || !isMobile) && (
        <div
          className={`${isMobile && showChat ? "hidden" : "flex"} h-full ${
            isMobile ? "w-full" : "w-[30%]"
          } min-w-[300px] flex-col border-r border-[#8696a026]`}
        >
          {!data || isLoading ? (
            <div className="flex h-full flex-col items-center justify-center bg-[#111b21] place-items-center">
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          ) : (
            <SidebarChats
              contacts={parsedContacts || []}
              onSelectContact={handleContactSelect}
              selectedContactId={selectedContact?.id}
            />
          )}
        </div>
      )}

      {(showChat || !isMobile) && (
        <div
          className={`${isMobile && !showChat ? "hidden" : "flex"} h-full ${
            isMobile ? "w-full" : "flex-1"
          } flex-col`}
        >
          {selectedContact ? (
            <ChatArea
              contact={selectedContact}
              onBack={handleBackToContacts}
              isMobile={isMobile}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#222e35] text-gray-400">
              <div className="text-center">
                <p className="text-xl font-light">Os chats aparecerão aqui</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
