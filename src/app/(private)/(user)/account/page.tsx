"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetUserInfo } from "@/features/user/api/use-get-user-info";
import Image from "next/image";
import { UserInfoForm } from "./_components/user-info-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import Loading from "../../loading";

export default function AccountPage() {
  const { data, isLoading } = useGetUserInfo();
  const [logoUrl, setLogoUrl] = React.useState("/fallback-logo.png");
  const [formattedDate, setFormattedDate] = React.useState("Nunca acessou");

  React.useEffect(() => {
    if (data?.time.logo) {
      setLogoUrl(
        new URL(data.time.logo, process.env.NEXT_PUBLIC_S3_FILES).toString()
      );
    }
  }, [data?.time.logo]);

  React.useEffect(() => {
    if (data?.usuario.ultimo_acesso) {
      setFormattedDate(
        format(new Date(data.usuario.ultimo_acesso), "dd/MM/yyyy 'às' HH:mm", {
          locale: ptBR,
        })
      );
    }
  }, [data?.usuario.ultimo_acesso]);

  if (!data || isLoading) return <Loading />;

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      {/* User Panel */}
      <div className="flex flex-col gap-3 md:flex-row items-center border-b pb-6 md:pb-8">
        <Avatar className="size-24 md:size-16">
          <AvatarFallback className="text-3xl uppercase md:text-xl font-semibold">
            {data.usuario.nome[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grid text-center md:text-left">
          <h2 className="text-2xl md:text-xl text-center md:text-left font-normal">
            {data.usuario.nome}
          </h2>
          <span className="text-lg md:text-base text-muted-foreground">
            {data.usuario.email}
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="grid gap-4 py-6 md:py-8 text-left border-b">
        <h3 className="text-lg font-semibold">Informações Pessoais:</h3>
        <UserInfoForm user={data.usuario} />
      </div>

      {/* Team */}
      <div className="grid gap-4 justify-center md:justify-start py-6 md:py-8 text-left border-b">
        <h3 className="text-lg font-semibold">Sua Equipe:</h3>
        <Image src={logoUrl} alt={data.time.nome} width={80} height={80} />
      </div>

      {/* Security */}
      <div className="grid gap-4 justify-center md:justify-start py-6 md:py-8 text-left border-b">
        <h3 className="text-lg font-semibold">Segurança:</h3>
        <h3 className="text-muted-foreground">
          Último Acesso: {formattedDate}
        </h3>
      </div>
    </div>
  );
}
