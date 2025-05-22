export interface RawData {
  chat: {
    messages: {
      total: number;
      pages: number;
      currentPage: number;
      records: RawMessage[];
    };
  };
}

export interface RawMessage {
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

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "me" | "them";
  senderName?: string;
  status: "sent" | "delivered" | "read";
}

export interface Contact {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: string;
  isGroup?: boolean;
  messages: Message[];
}
