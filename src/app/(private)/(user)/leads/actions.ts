"use server";

import { cookies } from "next/headers";
import { LeadsResponse } from "./types";
import { api } from "@/lib/api";

export async function getLeads() {
  const token = (await cookies()).get("login@solvus-token")?.value;

  try {
    const { data } = await api.post<LeadsResponse>(
      "/leads",
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Erro ao buscar Leads.");
  }
}
