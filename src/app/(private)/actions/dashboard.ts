"use server";

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
