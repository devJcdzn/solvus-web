import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Contact, Message } from "@/app/(private)/(user)/contact/types";
import { ChatContact } from "@/features/dashboard/types";

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

interface RawMessage {
  id: string;
  key: {
    id: string;
    fromMe: boolean;
    remoteJid: string;
  };
  pushName: string;
  messageType: string;
  message: {
    conversation: string;
  };
  messageTimestamp: number;
  MessageUpdate?: {
    status: "DELIVERY_ACK" | "READ" | string;
  }[];
}

interface RawMessage {
  id: string;
  key: {
    id: string;
    fromMe: boolean;
    remoteJid: string;
  };
  pushName: string;
  messageType: string;
  message: {
    conversation: string;
  };
  messageTimestamp: number;
  MessageUpdate?: {
    status: "DELIVERY_ACK" | "READ" | string;
  }[];
}

interface RawChatResponse {
  chat: {
    messages: {
      records: RawMessage[];
    };
  };
}

export function transformChatData(raw: RawChatResponse): Contact {
  const records = raw.chat.messages.records;

  const messages: Message[] = records.map((msg) => {
    const date = new Date(msg.messageTimestamp * 1000);
    return {
      id: msg.id,
      content: msg.message?.conversation || "",
      timestamp: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      messageTimestamp: msg.messageTimestamp,
      sender: msg.key.fromMe ? "me" : "them",
      senderName: msg.pushName || undefined,
      status: mapStatus(msg),
    };
  });

  const lastMsg = messages.at(-1);

  return {
    id: records[0]?.key.remoteJid ?? "unknown",
    name: records[0]?.pushName || "Contato",
    avatar: "/placeholder.svg",
    lastMessage: lastMsg?.content || "",
    timestamp: lastMsg?.timestamp || "",
    unread: 0,
    status: "offline",
    isGroup: records[0]?.key.remoteJid?.includes("@g.us") ?? false,
    messages,
  };
}

function mapStatus(msg: RawMessage): "sent" | "delivered" | "read" {
  const status = msg.MessageUpdate?.[0]?.status;

  switch (status) {
    case "READ":
      return "read";
    case "DELIVERY_ACK":
      return "delivered";
    default:
      return "sent";
  }
}

export function transformChatContactsToContacts(
  chats: Record<string, ChatContact[]>
): Contact[] {
  const contacts: Contact[] = [];

  for (const [chatName, data] of Object.entries(chats)) {
    data.map((contact) =>
      contacts.push({
        id: contact.remoteJid,
        name: contact.nome,
        avatar: contact.foto || null,
        lastMessage: contact.ultimaMensagem as string, // opcional: substitua por fetch real
        timestamp: "Agora", // opcional: substitua por timestamp real
        unread: 0, // fake para visual, ou use um valor real
        messages: [],
        status: "",
      })
    );
  }

  return contacts;
}
