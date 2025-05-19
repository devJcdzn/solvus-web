"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "./sidebar";
import React, { useContext } from "react";
import { UserData } from "@/app/(public)/(auth)/types/user-data";
import { useGetUserInfo } from "@/features/user/api/use-get-user-info";

const pathTranslations: Record<string, string> = {
  account: "Conta",
  assistants: "Assistentes",
  contact: "Contatos",
  settings: "Configurações",
  history: "Histórico",
  profile: "Perfil",
  dashboard: "Dashboard",
  users: "Usuários",
  projects: "Projetos",
  tasks: "Tarefas",
  reports: "Relatórios",
  analytics: "Anlytics",
  notifications: "Notificações",
  help: "Ajuda",
  about: "Sobre",
};

const HeaderBreadcrumb = ({ path }: { path: string }) => {
  const segments = path.split("/").filter(Boolean); // remove vazios
  const fullPaths = segments.map(
    // biome-ignore lint/style/useTemplate: <explanation>
    (_, i) => "/" + segments.slice(0, i + 1).join("/")
  );

  const translateSegment = (segment: string) => {
    return pathTranslations[segment] || segment.replace(/-/g, " ");
  };

  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, i) => (
          <React.Fragment key={`segment-${segment}-${i}`}>
            <BreadcrumbSeparator key={`sep-${segment + i}`} />
            <BreadcrumbItem key={fullPaths[i]}>
              <BreadcrumbLink className="capitalize" href={fullPaths[i]}>
                {translateSegment(segment)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const DashboardHeader = ({
  userData,
}: {
  userData: Partial<UserData>;
}) => {
  const pathname = usePathname();
  const { data } = useGetUserInfo();

  return (
    <header className="flex sticky top-0 z-30 rounded-lg border border-secondary sm:border-none left-0 bg-secondary/30 backdrop-blur-lg p-3 w-full justify-between items-center">
      <div className="flex gap-3 items-center">
        <SidebarTrigger />
        <HeaderBreadcrumb path={pathname} />
      </div>
      <div className="flex items-center gap-4 p-2 rounded-full bg-background">
        <form action="" className="hidden sm:block">
          <Input
            type="text"
            placeholder="Pesquisar"
            className="bg-background rounded-full"
          />
        </form>

        <Link
          href={"/about"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-full"
          )}
        >
          <Info className="size-5 text-muted-foreground" />
        </Link>

        <Avatar className="" asChild>
          <Link href={"/account"}>
            <AvatarFallback className="">
              {data?.usuario.nome[0] || userData.usuario?.nome[0]}
            </AvatarFallback>
          </Link>
        </Avatar>
      </div>
    </header>
  );
};
