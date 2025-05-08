"use server";

import { format } from "date-fns";
import {
  BarChartData,
  CompletionsOpenai,
  CostsOpenai,
  DashboardData,
  PieChartData,
} from "../types/dashoboard";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";

const data = {
  time: {
    id: "2",
    logo: "uploads/images/logo-dana.png",
    nome: "Dana",
    cor_primaria: " #088ec9",
    cor_secundaria: "#000000",
    project_id: "proj_MVnxk2FNOWg0d9KyNxDjSTAz",
  },
  dados_uso: [],
  completions_openai: [
    {
      object: "bucket",
      start_time: 1746057600,
      end_time: 1746144000,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746144000,
      end_time: 1746230400,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746230400,
      end_time: 1746316800,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746316800,
      end_time: 1746403200,
      results: [],
    },
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
  ],
  costs_openai: [
    {
      object: "bucket",
      start_time: 1746057600,
      end_time: 1746144000,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746144000,
      end_time: 1746230400,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746230400,
      end_time: 1746316800,
      results: [],
    },
    {
      object: "bucket",
      start_time: 1746316800,
      end_time: 1746403200,
      results: [],
    },
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
  ],
};

async function getData(startDate?: string, endDate?: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  console.log(token);

  const { data } = await axios.post<DashboardData>(
    "http://app.solvus.io/rest/dashboard",
    {
      Authorization: `Bearer ${token}`,
      startDate: "",
      endDate: "",
    }
  );

  return data;
}

export async function loadDashboardData() {
  const { time, completions_openai, costs_openai } = data;

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
    const date = format(new Date(bucket.start_time * 1000), "dd/MM");

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
    c.results.forEach((r) => {
      const org = r.organization_id || "desconhecido";
      const value = r.amount.value || 0;

      costByOrg[org] = (costByOrg[org] || 0) + value;
    });
  });

  return Object.entries(costByOrg).map(([name, value]) => ({ name, value }));
}
