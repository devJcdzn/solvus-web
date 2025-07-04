export interface DashboardData {
  time: Time;
  dados_uso: accessData;
  completions_openai: CompletionsOpenai[];
  costs_openai: CostsOpenai[];
}

export interface Time {
  id: string;
  logo: string;
  nome: string;
  cor_primaria: string;
  cor_secundaria: string;
  project_id: string;
}

export interface accessData {
  quantidades_acessos: number;
  percentual_acessos: number;
  assistentes_usados: string[];
  assuntos_conversas: AssuntosConversa[];
  mapa_calor: HeatMap;
  quantidade_contatos: number;
  quantidade_mensagens: number;
  tempo_medio_resposta: {
    [key: string]: string;
  };
  quantidade_chats: number;
  chats: {
    [key: string]: ChatContact[];
  };
}

interface HeatMap {
  [key: string]: MapKey[];
}

export interface MapKey {
  uf: string;
  quantidade: string;
}

export interface AssuntosConversa {
  categoria: string;
  quantidade: number;
}

export interface ChatContact {
  numero: string;
  nome: string;
  foto: string | null;
  ultimaMensagem?: string;
  remoteJid: string;
}

export interface CompletionsOpenai {
  object: string;
  start_time: number;
  end_time: number;
  results: Result[];
}

export interface Result {
  object: string;
  input_tokens: number;
  output_tokens: number;
  num_model_requests: number;
  project_id: any;
  user_id: any;
  api_key_id: any;
  model: any;
  batch: any;
  input_cached_tokens: number;
  input_audio_tokens: number;
  output_audio_tokens: number;
}

export interface CostsOpenai {
  object: string;
  start_time: number;
  end_time: number;
  results: Result2[];
}

export interface Result2 {
  object: string;
  amount: Amount;
  line_item: any;
  project_id: any;
  organization_id: string;
}

export interface Amount {
  value: number;
  currency: string;
}

export type BarChartData = {
  date: string;
  tokens: number;
  requests: number;
  cost: number;
};

export interface PieChartData {
  name: string;
  value: number;
}
