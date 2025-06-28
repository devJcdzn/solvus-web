"use client";

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
import { cn } from "@/lib/utils";
import { AssuntosConversa } from "@/features/dashboard/types";

interface PieChartProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const colorMap = {
  produtos: "#FF5733",
  ondeComprar: "#33C1FF",
  garantia: "#FFB833",
  suporte: "#9B33FF",
  reclamacoes: "#FF33A6",
  curriculos: "#33FF8A",
  outros: "#6B7280",
};

const chartConfig = {
  visitors: {
    label: "Conversas",
  },
  produtos: {
    label: "Produtos",
    color: "var(--chart-1)",
  },
  ondeComprar: {
    label: "Onde Comprar",
    color: "var(--chart-2)",
  },
  garantia: {
    label: "Garantia",
    color: "var(--chart-3)",
  },
  suporte: {
    label: "Suporte",
    color: "var(--chart-4)",
  },
  reclamacoes: {
    label: "Reclamações",
    color: "var(--chart-5)",
  },
  curriculos: {
    label: "Currículos",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export function DashboardPieChart({
  team,
  data,
}: {
  team: PieChartProps;
  data: AssuntosConversa[];
}) {
  console.log(data);

  if (data?.length === 0 || !data) {
    return (
      <Card className="flex flex-col col-span-2">
        <CardHeader className="items-center pb-0">
          <CardTitle>Análise dos Assuntos das Conversas</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <p className="text-xl font-normal text-muted-foreground text-center">
            Sem dados para análise.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Transform the data to match the chart format
  const chartData = data?.map((item) => {
    const normalizedCategoria = item.categoria
      .toLowerCase()
      .replace(/\s+/g, "");
    const fill = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

    return {
      browser: item.categoria,
      visitors: item.quantidade,
      fill: fill,
    };
  });

  // Calculate total for percentage calculations
  const total = data.reduce((sum, item) => sum + item.quantidade, 0);

  // Create cards data with percentages
  const cardsData = data.map((item) => {
    const percentage =
      total > 0 ? Math.round((item.quantidade / total) * 100) : 0;
    // Generate a random percentage change for demonstration
    const percentChange = Math.floor(Math.random() * 40) - 20; // -20 to +20

    return {
      name: item.categoria,
      data: item.quantidade,
      percent: percentChange,
      percentage: percentage,
    };
  });

  return (
    <Card className="flex flex-col col-span-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Análise dos Assuntos das Conversas</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex flex-col lg:flex-row items-center gap-2">
        <div className="flex flex-1 items-center">
          <div className="flex flex-col gap-y-2 text-sm">
            {chartData.map((item) => (
              <div
                key={item.browser}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-x-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="capitalize text-xs text-muted-foreground">
                    {item.browser}
                  </span>
                </div>
                <span className="font-semibold text-sm ml-1">
                  {item.visitors}
                </span>
              </div>
            ))}
          </div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] flex-1"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="grid gap-1 place-items-center p-2 bg-blue-50 border-2 
                border-transparent hover:border-blue-500 rounded-lg w-full"
            >
              <span className="text-xl text-blue-900 font-bold">
                {card.data}
              </span>
              <h2 className="text-sm text-muted-foreground">{card.name}</h2>
              <span className="text-xs text-center text-gray-600">
                {card.percentage}% do total
              </span>
              <span
                className={cn(
                  "text-xs text-center",
                  card.percent < 0 ? "text-red-500" : "text-emerald-500"
                )}
              >
                {card.percent}% vs último mês
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
