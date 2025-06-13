"use server";

import { api } from "@/lib/api";
import { GuestAssistantResponse } from "./types";

export async function getGuestChat(chatSlug: string) {
  const { data } = await api.post<GuestAssistantResponse>(
    "/getGuestAssistant",
    {
      assistente: chatSlug,
    }
  );

  return data;
}
