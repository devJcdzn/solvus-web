"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bot, Lock, Play, Database } from "lucide-react";
import { FileUploader } from "./file-uploader";

export default function AdminAssistantsPage() {
  return (
    <div className="p-6 mt-5">
      <div className="px-2 md:px-6 grid md:grid-cols-2 gap-4">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="flex items-center">
            <div className="size-6 bg-blue-300/80 rounded-sm grid place-items-center">
              <Lock className="size-4 text-blue-800" />
            </div>
            <CardTitle>Treine seu assistente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-sm flex p-4">
              <textarea
                disabled
                className="resize-none w-full blur-sm p-3 border-none outline-none"
                value={
                  "Olá, sou o Assistente Virtual da Solvus! Estou aqui para ajudar você a automatizar tarefas, responder dúvidas frequentes e otimizar o atendimento ao cliente. Configure meus parâmetros, defina fluxos de conversa e personalize minhas respostas para garantir a melhor experiência possível aos seus usuários. Conte comigo para transformar seu atendimento!"
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3 md:gap-0 col-span-2 md:col-span-1">
          <Card className="h-fit">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 bg-blue-300/80 rounded-sm grid place-items-center">
                  <Bot className="size-4 text-blue-800" />
                </div>
                <CardTitle>Status do assistente</CardTitle>
              </div>
              <div className="">
                <div className="flex items-center space-x-2">
                  <label htmlFor="active" className="text-sm">
                    Ativo
                  </label>
                  <Switch id="active" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="h-fit py-5">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 bg-blue-300/80 rounded-sm grid place-items-center">
                  <Play className="size-4 text-blue-800" />
                </div>
                <CardTitle>Testar Assistente</CardTitle>
              </div>
              <div className="">
                <Button
                  className="rounded-sm text-xs bg-blue-500 hover:bg-blue-600"
                  size={"sm"}
                >
                  <Play />
                  Testar
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-blue-300/80 rounded-sm grid place-items-center">
                <Database className="size-4 text-blue-800" />
              </div>
              <CardTitle>Vector Store</CardTitle>
            </div>
            <div className="">
              <div className="flex items-center space-x-2">
                <label htmlFor="active" className="text-sm">
                  Usar arquivos
                </label>
                <Switch id="active" />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="col-span-2 mt-4">
          <FileUploader />
        </div>
      </div>
    </div>
  );
}
