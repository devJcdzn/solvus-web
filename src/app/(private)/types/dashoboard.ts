export interface DashboardData {
    time: Time
    dados_uso: any[]
    completions_openai: CompletionsOpenai[]
    costs_openai: CostsOpenai[]
  }
  
  export interface Time {
    id: string
    logo: string
    nome: string
    cor_primaria: string
    cor_secundaria: string
    project_id: string
  }
  
  export interface CompletionsOpenai {
    object: string
    start_time: number
    end_time: number
    results: Result[]
  }
  
  export interface Result {
    object: string
    input_tokens: number
    output_tokens: number
    num_model_requests: number
    project_id: any
    user_id: any
    api_key_id: any
    model: any
    batch: any
    input_cached_tokens: number
    input_audio_tokens: number
    output_audio_tokens: number
  }
  
  export interface CostsOpenai {
    object: string
    start_time: number
    end_time: number
    results: Result2[]
  }
  
  export interface Result2 {
    object: string
    amount: Amount
    line_item: any
    project_id: any
    organization_id: string
  }
  
  export interface Amount {
    value: number
    currency: string
  }
  