"use client";

import { MultiBarChart } from "@/components/bar-chart";
import { DashboardPieChart } from "@/components/pie-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FilterData } from "./_components/filter-data";
import { useGetDashboardData } from "@/features/dashboard/api/use-get-data";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { normalizarNumero } from "@/lib/utils";

export default function Home() {
  const params = useSearchParams();

  const startDate = params.get("from") || "";
  const endDate = params.get("to") || "";

  const { data, isLoading } = useGetDashboardData(startDate, endDate);

  if (!data || isLoading) return <Loading />;

  console.log(data);

  return (
    <div className="p-6 mt-5 bg-background rounded-xl border">
      <div className="flex gap-2 w-full  flex-col sm:flex-row items-center justify-between mb-6">
        <FilterData />
        <Button size={"sm"} variant={"outline"} className="w-full sm:w-fit">
          <Download />
          Baixar dados
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <MultiBarChart
          team={data.teamData}
          data={{
            barChart: data.barChartData,
            access: data.access,
          }}
        />
        <div>
          <Card className="flex flex-col border-none p-0 gap-2 max-h-[60vh] overflow-auto">
            <header
              className="px-2 py-3 w-full sticky top-0 z-40"
              style={{ backgroundColor: data.teamData.primaryColor }}
            >
              <h4 className="text-white font-semibold">Conversas</h4>
            </header>
            <div className="flex flex-col">
              {Array.isArray(
                data?.chats?.["UI - Dana - Seus assistente de trabalho!"]
              ) && data.chats[data.assistants[0]].length > 0 ? (
                data.chats[data.assistants[0]].map((chat) => {
                  const firstWord = chat.nome?.split("-")[0]?.trim() || "";
                  const fallback = /^\d/.test(firstWord)
                    ? chat.nome?.split("-")[1]?.trim()[0] || ""
                    : firstWord[0] || "";

                  return (
                    <div
                      key={chat.numero}
                      className="px-3 py-3 border-b flex gap-2"
                    >
                      <Avatar className="size-10">
                        <AvatarImage src={chat.foto || ""} />
                        <AvatarFallback>{fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="text-sm font-semibold">{chat.nome}</h5>
                        <p className="text-muted-foreground text-sm leading-3">
                          {normalizarNumero(chat.numero)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-3 py-3 text-muted-foreground text-center">
                  Nenhuma conversa disponível
                </div>
              )}
            </div>
          </Card>
        </div>
        <DashboardPieChart team={data.teamData} data={data.assistants} />
      </div>
    </div>
  );
}
