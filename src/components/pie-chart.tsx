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
  // const pieData = data?.map((assistant) => ({
  //   name: assistant,
  //   value: Math.round((100 / data.length) * 100) / 100,
  // }));

  // const chartConfig = data.reduce((acc, assistant, index) => {
  //   acc[assistant] = {
  //     label: assistant,
  //     color:
  //       [
  //         team.primaryColor,
  //         team.secondaryColor,
  //         "var(--chart-3)",
  //         "var(--chart-4)",
  //         "var(--chart-5)",
  //         "var(--chart-6)",
  //       ][index % 6] ?? `var(--chart-${index + 1})`,
  //   };
  //   return acc;
  // }, {} as ChartConfig);

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
      <CardFooter className="flex-col pt-2 border-t text-xs sm:text-sm text-muted-foreground text-center">
         
      </CardFooter>
    </Card>
  );
}
