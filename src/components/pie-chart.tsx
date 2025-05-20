"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export function DashboardPieChart({
  team,
  data,
}: {
  team: PieChartProps;
  data: string[];
}) {
  const pieData = data?.map((assistant) => ({
    name: assistant,
    value: Math.round((100 / data.length) * 100) / 100,
  }));

  const chartConfig = data.reduce((acc, assistant, index) => {
    acc[assistant] = {
      label: assistant,
      color:
        [
          team.primaryColor,
          team.secondaryColor,
          "var(--chart-3)",
          "var(--chart-4)",
          "var(--chart-5)",
          "var(--chart-6)",
        ][index % 6] ?? `var(--chart-${index + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  // Custom Tooltip para exibir porcentagem
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any;
  }) => {
    if (active && payload?.length) {
      const { name, value } = payload[0];
      return (
        <div className="rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
          <div className="font-medium text-xs">{name}</div>
          <div className="text-muted-foreground text-sm">
            {value.toFixed(0)}%
          </div>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0)
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Assistentes mais usados</CardTitle>
          <CardDescription>
            Análise de uso proporcional por assistente
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <p
            className="text-xl font-normal text-muted-foreground 
          text-center"
          >
            Sem assisitentes usados no preríodo.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Assistentes mais usados</CardTitle>
        <CardDescription>
          Análise de uso proporcional por assistente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              stroke="0"
              label={({ name, value }) => `${value.toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartConfig[entry.name]?.color ??
                    `var(--chart-${(index % 6) + 1})`
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col pt-2 border-t text-xs sm:text-sm text-muted-foreground text-center">
        O relatório visa monitorar o crescimento contínuo das atividades da
        comunidade, sinalizando possíveis quedas quando os dados se mostram
        estagnados.
      </CardFooter>
    </Card>
  );
}
