"use client";

import { SidebarContext } from "../../_components/sidebar";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useContext } from "react";
import { Agente } from "@/features/assistants/type";

export const AssistantCard = ({
  agent,
  handleClick,
}: {
  agent: Agente;
  handleClick: () => void;
}) => {
  const { adminData } = useContext(SidebarContext);

  console.log(adminData);

  return (
    <Card
      onClick={handleClick}
      className="p-0 gap-0 relative overflow-hidden shadow-none 
      hover:scale-105 transition-all cursor-pointer"
    >
      <div className="w-full flex flex-col p-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_FILES}/${agent.avatar}`}
          alt="logo dana"
          width={120}
          height={120}
          className="size-24 border rounded-full object-contain"
        />
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="font-semibold">{agent.nome}</h2>
        <p className="text-muted-foreground text-sm">{agent.descricao}</p>
        <span
          className="font-semibold mt-1 text-white text-xs p-1.5 
              absolute -top-1 right-0 bg-black rounded-bl-sm"
          style={{ backgroundColor: adminData?.time?.cor_primaria }}
        >
          {agent.tipo}
        </span>
      </div>
    </Card>
  );
};
