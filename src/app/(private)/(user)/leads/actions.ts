"use server";

import { cookies } from "next/headers";
import { LeadsResponse } from "./types";
import { api } from "@/lib/api";

export async function getLeads(orderby?: string, query?: string) {
  const token = (await cookies()).get("login@solvus-token")?.value;

  try {
    const queryParams = new URLSearchParams();
    if (query) queryParams.append('q', query);
    if (orderby) queryParams.append('order', orderby);
    
    const { data } = await api.post<LeadsResponse>(`/leads?${queryParams.toString()}`, {
      Authorization: `Bearer ${token}`,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Erro ao buscar Leads.");
  }
}
