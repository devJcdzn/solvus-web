"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { RawData } from "./types";
import { getData } from "../actions/dashboard";

export async function getChatData(remoteJid: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  const { data } = await axios.post<RawData>(
    "https://app.solvus.io/rest/getChat",
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
