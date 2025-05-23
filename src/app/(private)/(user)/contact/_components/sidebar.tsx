"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { Contact } from "../types";
import { SidebarContext } from "@/app/(private)/_components/sidebar";

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
}

export const SidebarChats = ({
  contacts,
  onSelectContact,
  selectedContactId,
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userData } = useContext(SidebarContext);

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col bg-[#111b21]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-[#202c33] rounded-tl-lg">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userData.time?.logo} />
          <AvatarFallback>{userData.time?.nome[0]}</AvatarFallback>
        </Avatar>
      </div>

      {/* Search */}
      <div className="p-2 bg-[#111b21]">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-[#aebac1]" />
          </div>
          <Input
            type="text"
            placeholder="Buscar"
            className="pl-10 bg-[#202c33] border-none text-[#d1d7db] placeholder:text-[#8696a0] h-9 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => {
          const firstWord = contact.name?.split("-")[0]?.trim() || "";
          const fallback = /^\d/.test(firstWord)
            ? contact.name?.split("-")[1]?.trim()[0] || ""
            : firstWord[0] || "";

          return (
            <div
              key={contact.id}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-[#202c33] ${
                selectedContactId === contact.id ? "bg-[#2a3942]" : ""
              }`}
              onClick={() => onSelectContact(contact)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={contact.avatar || "/placeholder.svg"}
                  alt={contact.name}
                />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[#e9edef] font-medium truncate">
                    {contact.name}
                  </h3>
                  {/* <span className="text-xs text-[#8696a0]">
                    {contact.timestamp}
                  </span> */}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#8696a0] truncate">
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <span className="bg-[#00a884] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
