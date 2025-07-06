export interface IntegrationsResponse {
  channels: Channel[]
}

export interface Channel {
  id: string
  nome: string
  descricao: string
  logo: string
}