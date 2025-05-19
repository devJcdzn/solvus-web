import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizarNumero(numero: string): string | null {
  // Remove sufixo do WhatsApp
  const limpo = numero.replace(/@s\.whatsapp\.net$/, "");

  // Remove tudo que não for número
  const apenasNumeros = limpo.replace(/\D/g, "");

  // Verificação mínima de comprimento (Brasil: 12-13 dígitos com DDI + DDD + número)
  if (apenasNumeros.length < 11 || apenasNumeros.length > 13) {
    return null; // Número inválido
  }

  // Corrige casos onde começa com 0 ou está faltando o DDI (opcional)
  if (apenasNumeros.startsWith("0")) {
    return null; // Inválido: começa com zero
  }

  // Garante que começa com 55 (DDI Brasil)
  if (!apenasNumeros.startsWith("55")) {
    return `55${apenasNumeros}`;
  }

  return apenasNumeros;
}
