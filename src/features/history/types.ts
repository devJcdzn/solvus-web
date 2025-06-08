export interface HistoryResponse {
  conversas: Conversas;
}

export interface Conversas {
  threads: Thread[];
  mensagem: Mensagem;
}

export interface Thread {
  id: string;
  agente_id: string;
  usuario_id: string;
  limpa: string;
  agente_nome: string;
}

export interface Mensagem {
  [key: string]: Content;
}

export interface Content {
  id: string;
  conteudo: string;
  id_agente: string;
}

// Chat history

export interface ChatHistoryResponse {
  agente_avatar: AgenteAvatar
  agente: Agente
  mensagens: Mensagen[]
}

export interface AgenteAvatar {
  avatar: string
}

export interface Agente {
  agente_nome: string
  avatar: string
}

export interface Mensagen {
  id: string
  id_usuario: string
  id_agente: string
  conteudo: string
  thread_id: string
  custo: string
  regiao: string
}
