"use client";

import { SidebarContext } from "@/app/(private)/_components/sidebar";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useContext } from "react";
import { Agente } from "../types";

export const AssistantCard = ({ agent }: { agent: Agente }) => {
  const { userData } = useContext(SidebarContext);

  return (
    <Card className="p-0 gap-0 relative overflow-hidden shadow-none">
      <div className="w-full flex flex-col p-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_FILES}/assets/images/logo-dana.png`}
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
          style={{ backgroundColor: userData.time?.cor_primaria }}
        >
          {agent.tipo}
        </span>
      </div>
    </Card>
  );
};
