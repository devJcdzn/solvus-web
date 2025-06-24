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
};

const chartData = [
  { browser: "Produtos", visitors: 325, fill: colorMap.produtos },
  { browser: "Onde Comprar", visitors: 201, fill: colorMap.ondeComprar },
  { browser: "Garantia", visitors: 156, fill: colorMap.garantia },
  { browser: "Suporte", visitors: 143, fill: colorMap.suporte },
  { browser: "Reclamações", visitors: 89, fill: colorMap.reclamacoes },
  { browser: "Currículos", visitors: 67, fill: colorMap.curriculos },
];

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

const fictionalData = [
  {
    name: "Produtos",
    data: 325,
    percent: 18,
  },
  {
    name: "Onde Comprar",
    data: 201,
    percent: 25,
  },
  {
    name: "Garantia",
    data: 156,
    percent: -12,
  },
  {
    name: "Suporte",
    data: 143,
    percent: -2,
  },
  {
    name: "Reclamações",
    data: 89,
    percent: 8,
  },
  {
    name: "Currículos",
    data: 67,
    percent: 35,
  },
];

export function DashboardPieChart({
  team,
  data,
}: {
  team: PieChartProps;
  data: string[];
}) {
  // if (data.length === 0)
  //   return (
  //     <Card className="flex flex-col col-span-2">
  //       <CardHeader className="items-center pb-0">
  //         <CardTitle>Análise dos Assuntos das Conversas</CardTitle>
  //       </CardHeader>
  //       <CardContent className="flex-1 pb-0">
  //         <p
  //           className="text-xl font-normal text-muted-foreground
  //         text-center"
  //         >
  //           Sem dados para análise.
  //         </p>
  //       </CardContent>
  //     </Card>
  //   );

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
                <span className="font-semibold text-sm ml-1">{item.visitors}</span>
              </div>
            ))}
          </div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] "
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
          {fictionalData.map((card, index) => (
            <div
              key={index}
              className="grid gap-1 place-items-center p-2 bg-blue-50 border-2 
                border-transparent hover:border-blue-500 rounded-lg w-full"
            >
              <span className="text-xl text-blue-900 font-bold">
                {card.data}
              </span>
              <h2 className="text-sm text-muted-foreground">{card.name}</h2>
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
      <CardFooter className="flex-col pt-2 border-t text-xs sm:text-sm text-muted-foreground text-center"></CardFooter>
    </Card>
  );
}
