export interface ChatAssistantResponse {
    agente: Agente
    mensagens: any[]
  }
  
  export interface Agente {
    id: string
    avatar: string
    bucket: string
    nome: string
    descricao: string
    sk: string
    voz: string
    prompt: string
    vector_stores: string
    vector_stores_id: string
    gemini_key: string
    ass_id: string
    tipo: string
    time_id: string
    navegador: string
    restrito: string
    instancia: string
  }
  