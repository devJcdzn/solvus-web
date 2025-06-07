"use client";

import { ChatContact } from "@/features/dashboard/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { normalizarNumero } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Contact } from "../../contact/types";

export const LeadsCard = ({ contact }: { contact: ChatContact }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handleSetLead = () => {
    params.set("chat", contact.remoteJid);

    replace(`/contact?${params.toString()}`);
  };

  const firstWord = contact.nome?.split("-")[0]?.trim() || "";
  const fallback = /^\d/.test(firstWord)
    ? contact.nome?.split("-")[1]?.trim()[0] || ""
    : firstWord[0] || "";

  return (
    <Card
      className="py-4 gap-0 relative overflow-hidden shadow-none 
      hover:scale-105 transition-all cursor-pointer"
      onClick={handleSetLead}
    >
      <CardHeader className="w-full flex flex-col px-4">
        <Avatar className="size-12 border">
          <AvatarImage src={contact.foto || undefined} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <div className="px-4 py-3 flex flex-col gap-1">
        <h2 className="font-semibold text-sm">{contact.nome}</h2>
        <p className="text-muted-foreground text-xs">
          {normalizarNumero(contact.numero)}
        </p>
      </div>
    </Card>
  );
};
