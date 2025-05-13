"use client";

import { BarChartData } from "@/app/(private)/types/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface MultibarChartProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export const MultiBarChart = ({
  team,
  data,
}: {
  team: MultibarChartProps;
  data: {
    access: number;
    barChart: BarChartData[];
  };
}) => {
  const chartConfig = {
    tokens: {
      label: "Tokens",
      color: team.primaryColor || "var(--chart-1)",
    },
    requests: {
      label: "Requisições",
      color: team.secondaryColor || "var(--chart-2)",
    },
    cost: {
      label: "Custo (USD)",
      color: "#f59e0b",
    },
  } satisfies ChartConfig;

  const totalCost = data.barChart.reduce((sum, item) => sum + item.cost, 0);
  const totalRequests = data.barChart.reduce(
    (sum, item) => sum + item.requests,
    0
  );
  const totalTokens = data.barChart.reduce((sum, item) => sum + item.tokens, 0);
  const usageRate = totalTokens ? (totalRequests / totalTokens) * 100 : 0;

  return (
    <Card className="px-4 py-3 gap-3 border-none">
      <CardHeader className="relative border-b flex gap-2 items-center">
        <div className="size-12 p-2 grid place-items-center bg-border rounded-lg">
          <Users className="size-6 text-muted-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl">
            {Intl.NumberFormat("pt-BR", { notation: "compact" }).format(
              data.access
            )}
          </CardTitle>
          <CardDescription>Acessos na Plataforma</CardDescription>
        </div>
        <span className="py-1 absolute top-3 right-4 px-3 rounded bg-emerald-100 text-emerald-800 text-xs">
          +50%
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Créditos gastos:{" "}
            <strong className="text-foreground">${totalCost.toFixed(2)}</strong>
          </span>
          <span className="text-sm text-muted-foreground">
            Taxa de Uso:{" "}
            <strong className="text-foreground">{usageRate.toFixed(3)}%</strong>
          </span>
        </div>

        <ChartContainer config={chartConfig} className="mt-6">
          <BarChart data={data.barChart}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            {/* Eixos Y independentes */}
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="right-1"
              orientation="right"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right-2"
              orientation="right"
              tickLine={false}
              axisLine={false}
              hide
            />

            {/* Tooltip */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {/* Barras vinculadas aos eixos */}
            <Bar
              yAxisId="left"
              dataKey="tokens"
              fill={chartConfig.tokens.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right-1"
              dataKey="requests"
              fill={chartConfig.requests.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right-2"
              dataKey="cost"
              fill={chartConfig.cost.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
