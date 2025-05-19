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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const params = useSearchParams();

  const startDate = params.get("from") || "";
  const endDate = params.get("to") || "";

  const { data, isLoading } = useGetDashboardData(startDate, endDate);

  if (!data || isLoading) return <Loading />;

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
          <Card className="flex flex-col border-none p-0 overflow-hidden gap-2">
            <header
              className="px-2 py-3 w-full"
              style={{ backgroundColor: data.teamData.primaryColor }}
            >
              <h4 className="text-white font-semibold">Conversas</h4>
            </header>
            <div className="flex flex-col">
              <div className="px-3 py-3 border-b flex gap-1">
                <Avatar className="size-10">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="">
                  <h5 className="text-base font-semibold">Nome do Lead</h5>
                  <p className="text-muted-foreground text-sm leading-3">
                    Numero do lead
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <DashboardPieChart team={data.teamData} data={data.assistants} />
      </div>
    </div>
  );
}
