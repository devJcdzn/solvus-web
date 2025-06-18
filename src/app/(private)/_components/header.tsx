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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SidebarTrigger } from "./sidebar";
import React, { FormEvent, useContext, useState } from "react";
import { UserData } from "@/app/(public)/(auth)/types/user-data";
import { useGetUserInfo } from "@/features/user/api/use-get-user-info";

const pathTranslations: Record<string, string> = {
  account: "Conta",
  about: "Sobre",
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
  help: "Ajuda"
};

const HeaderBreadcrumb = ({ path }: { path: string }) => {
  const segments = path.split("/").filter(Boolean); // remove vazios
  const filteredSegments = segments.filter(segment => 
    segment !== "chat-history" &&
    !segment.startsWith("thread") &&
    // Exclude incrementing string IDs (e.g., "18", "42", etc.)
    !(typeof segment === "string" && /^\d+$/.test(segment))
  );
  const fullPaths = filteredSegments.map(
    // biome-ignore lint/style/useTemplate: <explanation>
    (_, i) => "/" + filteredSegments.slice(0, i + 1).join("/")
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
        {filteredSegments.map((segment, i) => (
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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const { data } = useGetUserInfo();
  const [leadQuery, setLeadQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    params.set("q", leadQuery);
    router.push(`/leads?${params.toString()}`);
    setLeadQuery("");
  };

  return (
    <header className="flex sticky top-0 z-40 rounded-lg border border-secondary sm:border-none left-0 bg-secondary/80 backdrop-blur-lg p-3 w-full justify-between items-center">
      <div className="flex gap-3 items-center">
        <SidebarTrigger />
        <HeaderBreadcrumb path={pathname} />
      </div>
      <div className="flex items-center gap-4 p-2 rounded-full bg-background">
        <form onSubmit={handleSubmit} className="hidden sm:block">
          <Input
            type="text"
            onChange={(e) => setLeadQuery(e.target.value)}
            value={leadQuery}
            placeholder="Pesquisar Leads"
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
