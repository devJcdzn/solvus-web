"use server";

import { format } from "date-fns";
import {
  BarChartData,
  CompletionsOpenai,
  CostsOpenai,
  DashboardData,
  PieChartData,
} from "../../types/dashboard";
import { cookies } from "next/headers";
import { api } from "@/lib/api";

const mockData = {
  time: {
    id: "2",
    logo: "uploads/images/logo-dana.png",
    nome: "Dana",
    cor_primaria: " #088ec9",
    cor_secundaria: "#000000",
    project_id: "proj_MVnxk2FNOWg0d9KyNxDjSTAz",
  },
  dados_uso: {
    quantidades_acessos: 0,
  },
  completions_openai: [
    {
      object: "bucket",
      start_time: 1746403200,
      end_time: 1746489600,
      results: [
        {
          object: "organization.usage.completions.result",
          input_tokens: 102105,
          output_tokens: 18635,
          num_model_requests: 10,
          project_id: null,
          user_id: null,
          api_key_id: null,
          model: null,
          batch: null,
          input_cached_tokens: 55552,
          input_audio_tokens: 0,
          output_audio_tokens: 0,
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746489600,
      end_time: 1746576000,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746576000,
      end_time: 1746662400,
      results: [
        {
          object: "organization.usage.completions.result",
          input_tokens: 171953,
          output_tokens: 15527,
          num_model_requests: 31,
          project_id: null,
          user_id: null,
          api_key_id: null,
          model: null,
          batch: null,
          input_cached_tokens: 32448,
          input_audio_tokens: 7126,
          output_audio_tokens: 1319,
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746662400,
      end_time: 1746748800,
      results: [
        {
          object: "organization.usage.completions.result",
          input_tokens: 21687,
          output_tokens: 197,
          num_model_requests: 3,
          project_id: null,
          user_id: null,
          api_key_id: null,
          model: null,
          batch: null,
          input_cached_tokens: 3200,
          input_audio_tokens: 0,
          output_audio_tokens: 0,
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746748800,
      end_time: 1746835200,
      results: [
        {
          object: "organization.usage.completions.result",
          input_tokens: 60261,
          output_tokens: 873,
          num_model_requests: 16,
          project_id: null,
          user_id: null,
          api_key_id: null,
          model: null,
          batch: null,
          input_cached_tokens: 10112,
          input_audio_tokens: 0,
          output_audio_tokens: 0,
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746835200,
      end_time: 1746921600,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746921600,
      end_time: 1747008000,
      results: [],
    },
  ],
  costs_openai: [
    {
      object: "bucket",
      start_time: 1746403200,
      end_time: 1746489600,
      results: [
        {
          object: "organization.costs.result",
          amount: {
            value: 0.368521849999999984159870791700086556375026702880859375,
            currency: "usd",
          },
          line_item: null,
          project_id: null,
          organization_id: "org-K8jEJsfHPPI8DzoHFJqNYICO",
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746489600,
      end_time: 1746576000,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746576000,
      end_time: 1746662400,
      results: [
        {
          object: "organization.costs.result",
          amount: {
            value: 0.73678784999999991089936202115495689213275909423828125,
            currency: "usd",
          },
          line_item: null,
          project_id: null,
          organization_id: "org-K8jEJsfHPPI8DzoHFJqNYICO",
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746662400,
      end_time: 1746748800,
      results: [
        {
          object: "organization.costs.result",
          amount: {
            value: 0.050323949999999999238564640791082638315856456756591796875,
            currency: "usd",
          },
          line_item: null,
          project_id: null,
          organization_id: "org-K8jEJsfHPPI8DzoHFJqNYICO",
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746748800,
      end_time: 1746835200,
      results: [
        {
          object: "organization.costs.result",
          amount: {
            value: 0.1364901999999999782087201083413674496114253997802734375,
            currency: "usd",
          },
          line_item: null,
          project_id: null,
          organization_id: "org-K8jEJsfHPPI8DzoHFJqNYICO",
        },
      ],
    },
    {
      object: "bucket",
      start_time: 1746835200,
      end_time: 1746921600,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746921600,
      end_time: 1747008000,
      results: [],
    },
  ],
};

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
    leads_length: dados_uso.quantidades_leads,
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
