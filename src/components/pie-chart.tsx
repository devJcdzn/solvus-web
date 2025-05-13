"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChartData } from "@/app/(private)/types/dashboard";
const chartData = [
  { assistant: "assist-rh", usage: 2750 / 100, fill: "var(--color-assist-rh)" },
  { assistant: "tech-aut", usage: 2000 / 100, fill: "var(--color-tech-aut)" },
  { assistant: "fort", usage: 5250 / 100, fill: "var(--color-fort)" },
];

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
    value: 100 / data.length,
  }));

  const defaultColors = [
    team.primaryColor || "var(--chart-1)",
    team.secondaryColor || "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
  ];

  const chartConfig = {
    value: {
      label: "Valor",
      color: team.primaryColor || "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col px-4 py-3 gap-3 border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center sm:text-left">
          Assistentes mais usados
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              label
              outerRadius="100%"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={defaultColors[index % defaultColors.length]}
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
