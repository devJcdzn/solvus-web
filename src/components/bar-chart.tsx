"use client";

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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "Segunda", platform: 186, messages: 80 },
  { month: "Terça", platform: 305, messages: 200 },
  { month: "Quarta", platform: 237, messages: 120 },
  { month: "Quinta", platform: 73, messages: 190 },
  { month: "Sexta", platform: 209, messages: 130 },
  { month: "Sábado", platform: 214, messages: 140 },
];

const chartConfig = {
  platform: {
    label: "Plataforma",
    color: "var(--chart-1)",
  },
  messages: {
    label: "WhatsApp",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const MultiBarChart = () => {
  return (
    <Card className="px-4 py-3 gap-3 border-none">
      <CardHeader className="relative border-b flex gap-2 items-center">
        <div className="size-12 p-2 grid place-items-center bg-border rounded-lg">
          <Users className="size-6 text-muted-foreground" />
        </div>
        <div className="">
          <CardTitle className="text-2xl">1.4K</CardTitle>
          <CardDescription>Acessos na Semana</CardDescription>
        </div>
        <span
          className="py-1 absolute top-3 right-4 px-3 rounded 
          bg-emerald-100 text-emerald-800 text-xs"
        >
          +50%
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Créditos gastos: <strong className="text-foreground">$2,232</strong>
          </span>
          <span className="text-sm text-muted-foreground">
            Taxa de Uso: <strong className="text-foreground">1.2%</strong>
          </span>
        </div>

        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="platform" fill="var(--color-platform)" radius={12} />
            <Bar dataKey="messages" fill="var(--color-messages)" radius={12} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
