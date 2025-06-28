"use client";

import { MultiBarChart } from "@/components/bar-chart";
import { DashboardPieChart } from "@/components/pie-chart";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Clock,
  Download,
  Lightbulb,
  MapPin,
  Rocket,
  Wrench,
} from "lucide-react";
import { FilterData } from "./_components/filter-data";
import { useGetDashboardData } from "@/features/dashboard/api/use-get-data";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
import { ChatViewer } from "./_components/chats-viewer";
import { BrazilHeatMap } from "@/components/heat-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "./_components/credits-card";

const insights = [
  {
    icon: Rocket,
    color: "text-red-500",
    title: "Alta demanda por informações de produtos",
    description:
      "324 menções nos últimos 7 dias (+18% vs mês anterior). Considere criar catálogo digital mais detalhado.",
  },
  {
    icon: MapPin,
    color: "text-red-500",
    title: "Forte crescimento nas regiões SP/RJ",
    description:
      "+45% conversas em São Paulo e +32% no Rio de Janeiro. Oportunidade de expansão de equipe.",
  },
  {
    icon: Clock,
    color: "text-orange-500",
    title: "Pico de atendimento entre 14h-16h",
    description:
      "38% das conversas ocorrem neste horário. Recomenda-se aumentar equipe de atendimento.",
  },
  {
    icon: Briefcase,
    color: "text-amber-700",
    title: "Boom de interesse em vagas (+35%)",
    description:
      "67 currículos recebidos este mês. Considere criar processo estruturado de RH.",
  },
  {
    icon: Wrench,
    color: "text-slate-500",
    title: "Questões de garantia aumentaram",
    description:
      "156 dúvidas sobre garantia (+12%). Urgente melhorar FAQ e documentação.",
  },
];

export default function Home() {
  const params = useSearchParams();

  const startDate = params.get("from") || "";
  const endDate = params.get("to") || "";

  const { data, isLoading } = useGetDashboardData(startDate, endDate);

  if (!data || isLoading) return <Loading />;

  const totalCost = data.barChartData.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="p-6 mt-5 rounded-xl">
      <div className="flex gap-2 w-full  flex-col sm:flex-row items-center justify-between mb-6">
        <FilterData />
        <Button size={"sm"} variant={"outline"} className="w-full sm:w-fit">
          <Download />
          Baixar dados
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6 gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">
              {Intl.NumberFormat("pt-BR").format(data.chats_length)}
            </CardTitle>
            <CardDescription>Conversas iniciadas</CardDescription>
            <CardDescription className="text-sm text-emerald-500">
              +12%
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">
              {Intl.NumberFormat("pt-BR").format(data.messages_length)}
            </CardTitle>
            <CardDescription>Mensagens</CardDescription>
            <CardDescription className="text-sm text-emerald-500">
              +12%
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">
              ${totalCost.toFixed(2)}
            </CardTitle>
            <CardDescription>Créditos gastos</CardDescription>
            <CardDescription className="text-sm text-emerald-500">
              +12%
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">2.3s</CardTitle>
            <CardDescription>Tempo Médio Resposta IA</CardDescription>
            <CardDescription className="text-sm text-emerald-500">
              +12%
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <MultiBarChart
          team={data.teamData}
          access_percent={data.access_percent}
          data={{
            barChart: data.barChartData,
            access: data.access,
          }}
        />
        <ChatViewer data={data} />
      </div>
      <div className="mt-4">
        <DashboardPieChart team={data.teamData} data={data.assuntos_conversas} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BrazilHeatMap />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Insights de Oportunidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 overflow-auto">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg bg-slate-50 p-4"
                >
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-emerald-400" />
                  <div className="ml-4 flex items-start gap-x-4">
                    <insight.icon
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${insight.color}`}
                    />
                    <div>
                      <h3 className="font-semibold">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <CreditCard />
    </div>
  );
}
