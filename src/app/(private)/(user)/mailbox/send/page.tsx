"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SendPage() {
  const [leadsGroup, setLeadsGroup] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const campaignType = searchParams.get("campaignType") || "";
  const emailType = searchParams.get("campaignType") || "";
  const name = searchParams.get("name") || "";

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="px-2 md:px-6 grid grid-cols-1 gap-6">
        <header className="py-2 flex items-center w-full gap-4 md:gap-6">
          <Button onClick={handleBack} variant={"ghost"}>
            <ArrowLeft />
            Voltar
          </Button>
          <h2 className="text-2xl">{name || "Minha Campanha"}</h2>
        </header>

        <div className="flex flex-col w-full gap-2 items-center">
          <div className="grid gap-1 mt-4 max-w-lg w-full">
            <label className="font-semibold">Selecionar Leads</label>
            <Select onValueChange={(value) => setLeadsGroup(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar Leads" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Leads</SelectLabel>
                  <SelectItem value="group-1">
                    Grupo 1 (150 Contatos)
                  </SelectItem>
                  <SelectItem value="group-2">
                    Grupo 2 (450 Contatos)
                  </SelectItem>
                  <SelectItem value="group-3">
                    Grupo 3 (1750 Contatos)
                  </SelectItem>
                  <SelectItem value="group-4">
                    Grupo 4 (4550 Contatos)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {campaignType === "email" && (
            <>
              <div className="grid gap-1 mt-4 max-w-lg w-full">
                <label htmlFor="context" className="font-semibold">
                  Assunto
                </label>
                <Input
                  id="context"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  placeholder="Assunto"
                  className=""
                />
              </div>
              <div className="grid gap-1 mt-4 max-w-lg w-full">
                <label htmlFor="title" className="font-semibold">
                  Titulo do Email
                </label>
                <Input
                  id="title"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  placeholder="Titulo do Email"
                  className=""
                />
              </div>
            </>
          )}

          <div className="grid gap-1 mt-4 max-w-lg w-full">
            <label htmlFor="message" className="font-semibold">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              placeholder="Conteúdo da mensagem aqui"
              className="resize-none border p-2 rounded-md"
            />
          </div>

          <div className="grid gap-1 w-full max-w-lg mt-2">
            <Button
              // onClick={handleCreate}
              className="bg-blue-500 hover:bg-blue-600 w-full rounded-sm"
            >
              Enviar
            </Button>
            <Button
              // onClick={handleCreate}
              className="w-fullrounded-sm"
              variant={"ghost"}
            >
              Testar Campanha
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
