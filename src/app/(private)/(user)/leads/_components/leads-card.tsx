import { ChatContact } from "@/app/(private)/types/dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { normalizarNumero } from "@/lib/utils";

export const LeadsCard = ({ contact }: { contact: ChatContact }) => {
  const firstWord = contact.nome?.split("-")[0]?.trim() || "";
  const fallback = /^\d/.test(firstWord)
    ? contact.nome?.split("-")[1]?.trim()[0] || ""
    : firstWord[0] || "";

  return (
    <Card
      className="p-0 gap-0 relative overflow-hidden shadow-none 
      hover:scale-105 transition-all cursor-pointer"
    >
      <div className="w-full flex flex-col p-4">
        <Avatar className="size-12">
          <AvatarImage src={contact.foto || undefined} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="font-semibold text-sm">{contact.nome}</h2>
        <p className="text-muted-foreground text-xs">
          {normalizarNumero(contact.numero)}
        </p>
      </div>
    </Card>
  );
};
