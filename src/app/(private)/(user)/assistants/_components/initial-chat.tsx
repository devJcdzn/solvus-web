import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatAssistantResponse } from "@/features/assistants/type";
import { GuestAssistantResponse } from "@/features/guest-chat/types";
import { Mic, Phone, SendHorizonal } from "lucide-react";
import Image from "next/image";
import { FormEvent } from "react";

export const InitialChat = ({
  data,
  onSubmit,
  message,
  setMessage,
}: {
  data: ChatAssistantResponse;
  message: string;
  onSubmit: (e: FormEvent) => void;
  setMessage: (message: string) => void;
}) => {
  const { agente } = data;

  return (
    <>
      <div className="grid place-items-center mb-10 w-full max-w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_FILES}/${agente.avatar}`}
          alt={agente.nome}
          width={120}
          height={120}
        />
        <h1 className="text-4xl font-bold capitalize">{agente.navegador}</h1>
        <h3 className="text-2xl font-semibold text-muted-foreground mt-4">
          Como posso te ajudar hoje?
        </h3>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row items-center gap-3 w-full max-w-full"
      >
        <Input
          placeholder="Mensagem para o assistente"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="p-6 shadow-lg w-full max-w-full focus:shadow-primary/15 
                border-none outline-0 ring-0 bg-background 
                focus-within:outline-0 focus-within:ring-0 focus-within:border-none 
                focus:border-none focus:outline-0 focus:ring-0 
                focus-visible:border-none focus-visible:outline-0 focus-visible:ring-0"
        />
        <div className="flex items-center gap-3 mt-5 md:mt-0">
          <Button type="submit" size={"lg"} className="rounded-full">
            <SendHorizonal className="size-5" />
          </Button>
          <Button type="button" size={"icon"}>
            <Phone className="size-5" />
          </Button>
          <Button type="button" size={"icon"}>
            <Mic className="size-5" />
          </Button>
        </div>
      </form>
    </>
  );
};
