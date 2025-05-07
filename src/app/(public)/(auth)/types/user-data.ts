export interface UserData {
  token: string;
  usuario: Usuario;
  time: Time;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface Time {
  id: string;
  logo: string;
  nome: string;
  cor_primaria: string;
  cor_secundaria: string;
  project_id: string;
}
