"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { ChatAssistantResponse } from "./type";

export async function getAssistantChat(assistantId: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  try {
    const { data } = await api.post<ChatAssistantResponse>("/getAssistant", {
      Authorization: `Bearer ${token}`,
      id: assistantId,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Erro ao buscar dados da API.");
  }
}
