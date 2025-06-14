"use client";

import { MultiBarChart } from "@/components/bar-chart";
import { DashboardPieChart } from "@/components/pie-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FilterData } from "./_components/filter-data";
import { useGetDashboardData } from "@/features/dashboard/api/use-get-data";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
import { ChatViewer } from "./_components/chats-viewer";
import { ChatsData } from "./_components/chats-data";
import { BrazilHeatMap } from "@/components/heat-map";

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
          access_percent={data.access_percent}
          data={{
            barChart: data.barChartData,
            access: data.access,
          }}
        />
        <div className="grid gap-3">
          <ChatsData data={data} />
          <ChatViewer data={data} />
        </div>
        <DashboardPieChart team={data.teamData} data={data.assistants} />
        <BrazilHeatMap />
      </div>
    </div>
  );
}
