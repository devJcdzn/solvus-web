"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { HistoryResponse } from "./types";

export async function getHistory() {
  const token = (await cookies()).get("login@solvus-token")?.value;

  try {
    const { data } = await api.post<HistoryResponse>("/history", {
      Authorization: `Bearer ${token}`,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  }
}

export async function useGetHistoryChat(threadId: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  try {
    const { data } = await api.post("/historyChat", {
      Authorization: `Bearer ${token}`,
      thread_id: threadId,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}
