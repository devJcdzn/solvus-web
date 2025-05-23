export interface LeadsResponse {
  conversas: {
    [key: string]: ChatContact[];
  };
}

export interface ChatContact {
  numero: string;
  nome: string;
  foto: string | null;
  ultimaMensagem?: string;
  remoteJid: string;
}
