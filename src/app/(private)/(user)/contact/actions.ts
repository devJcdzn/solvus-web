"use server";

import { cookies } from "next/headers";
import { RawData } from "./types";
import { getData } from "../actions/dashboard";
import { api } from "@/lib/api";

export async function getChatData(remoteJid: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  const { data } = await api.post<RawData>(
    "/getChat",
    {
      Authorization: `Bearer ${token}`,
      remoteJid,
    }
  );

  return data;
}

export async function getContacts() {
  const { dados_uso } = await getData();

  return {
    chats: dados_uso.chats,
  };
}
