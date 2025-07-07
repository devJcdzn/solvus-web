"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bot, Lock, Play, Database } from "lucide-react";
import { FileUploader } from "../_components/file-uploader";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetAssistantChat } from "@/features/assistants/api/use-get-assistant-chat";
import Loading from "@/app/(private)/loading";

export default function AdminAssistantsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading: fetching } = useGetAssistantChat(id);

  const [prompt, setPrompt] = useState(
    "Olá, sou o Assistente Virtual da Solvus! Estou aqui para ajudar você a automatizar tarefas, responder dúvidas frequentes e otimizar o atendimento ao cliente. Configure meus parâmetros, defina fluxos de conversa e personalize minhas respostas para garantir a melhor experiência possível aos seus usuários. Conte comigo para transformar seu atendimento!"
  );
  const [agentStatus, setAgentStatus] = useState(false);
  const [vectorStores, setVectorStores] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loading = isLoading || fetching;

  const sendPrompt = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.solvus.io/send-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          prompt: prompt,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchVectorStores = async (checked: boolean) => {
    try {
      const response = await fetch("https://api.solvus.io/switch-vector-stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ativo: checked,
        }),
      });
      const data = await response.json();
      console.log(data);
      setVectorStores(checked);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const switchAgentStatus = async (checked: boolean) => {
    try {
      const response = await fetch("https://api.solvus.io/switch-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ativo: checked,
        }),
      });
      const data = await response.json();
      console.log(data);
      setAgentStatus(checked);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading || !data) return <Loading />;

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
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="resize-none w-full p-3 border-none outline-none blur-xs"
                disabled
                rows={4}
              />
            </div>
            <Button
              onClick={sendPrompt}
              disabled={true}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600"
            >
              {loading ? "Enviando..." : "Enviar Prompt"}
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-3 h-fit md:gap-4 col-span-2 md:col-span-1">
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
                  <Switch
                    id="active"
                    checked={agentStatus}
                    onCheckedChange={switchAgentStatus}
                  />
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
                <label htmlFor="vector-stores" className="text-sm">
                  Usar arquivos
                </label>
                <Switch
                  id="vector-stores"
                  checked={vectorStores}
                  onCheckedChange={switchVectorStores}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="col-span-2 mt-4">
          <FileUploader bucket={data.agente.bucket} />
        </div>
      </div>
    </div>
  );
}
