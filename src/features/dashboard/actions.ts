"use server";

import { format } from "date-fns";
import {
  BarChartData,
  CompletionsOpenai,
  CostsOpenai,
  DashboardData,
  PieChartData,
} from "./types";
import { cookies } from "next/headers";
import { api } from "@/lib/api";

export async function getData(startDate?: string, endDate?: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  const { data } = await api.post<DashboardData>("/dashboard", {
    Authorization: `Bearer ${token}`,
    startDate,
    endDate,
  });

  return data;
}

export async function loadDashboardData(startDate?: string, endDate?: string) {
  const { time, completions_openai, costs_openai, dados_uso } = await getData(
    startDate,
    endDate
  );

  const [barChartData, pieChartData] = await Promise.all([
    prepareBarChartData({
      completions: completions_openai,
      costs: costs_openai,
    }),
    preparePieChartData(costs_openai),
  ]);

  const teamData = {
    primaryColor: time?.cor_primaria ?? undefined,
    secondaryColor: time?.cor_secundaria ?? undefined,
  };

  return {
    access: dados_uso.quantidades_acessos,
    access_percent: dados_uso.percentual_acessos,
    assistants: dados_uso.assistentes_usados,
    leads_length: dados_uso.quantidade_contatos,
    messages_length: dados_uso.quantidade_mensagens,
    chats_length: dados_uso.quantidade_chats,
    chats: dados_uso.chats,
    teamData,
    barChartData,
    pieChartData,
  };
}

export async function prepareBarChartData({
  completions,
  costs,
}: {
  completions: CompletionsOpenai[];
  costs: CostsOpenai[];
}): Promise<BarChartData[]> {
  return completions.map((bucket, index) => {
    const date = format(new Date(bucket.start_time), "dd/MM");

    const usage = bucket.results?.[0] ?? {
      input_tokens: 0,
      output_tokens: 0,
      num_model_requests: 0,
    };

    const costResult = costs[index]?.results?.[0];
    const cost = costResult ? costResult.amount.value : 0;

    return {
      date,
      tokens: usage.input_tokens + usage.output_tokens,
      requests: usage.num_model_requests,
      cost: Number(cost.toFixed(2)),
    };
  });
}

export async function preparePieChartData(
  costs: CostsOpenai[]
): Promise<PieChartData[]> {
  const costByOrg: Record<string, number> = {};

  costs.forEach((c) => {
    c.results?.forEach((r) => {
      const org = r.organization_id || "desconhecido";
      const value = r.amount.value || 0;

      costByOrg[org] = (costByOrg[org] || 0) + value;
    });
  });

  return Object.entries(costByOrg).map(([name, value]) => ({ name, value }));
}
