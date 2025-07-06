"use client";

import { SidebarContext } from "@/app/(private)/_components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Channel } from "@/features/integrations/types";
import Image from "next/image";
import { useContext } from "react";

export const IntegrationsCard = ({
  channel,
}: // handleClick,
{
  channel: Channel;
  // handleClick: () => void;
}) => {
  const { userData } = useContext(SidebarContext);

  return (
    <Card
      // onClick={handleClick}
      className="p-0 gap-0 relative overflow-hidden shadow-none 
      hover:scale-105 transition-all cursor-pointer"
    >
      <header className="w-full flex items-center justify-between p-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_FILES}/${channel.logo}`}
          alt={`logo ${channel.nome}`}
          width={40}
          height={40}
          className=" rounded-full object-cover"
        />
        <Button variant={"outline"} size={"sm"} className="text-xs">
          Em breve
        </Button>
      </header>
      <div className="px-4 py-0 flex flex-col gap-2">
        <h2 className="font-semibold">{channel.nome}</h2>
        <p className="text-muted-foreground text-sm">{channel.descricao}</p>
      </div>
    </Card>
  );
};
