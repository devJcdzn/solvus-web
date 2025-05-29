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
