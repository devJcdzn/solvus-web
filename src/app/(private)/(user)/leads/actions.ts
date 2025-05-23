"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { LeadsResponse } from "./types";

export async function getLeads() {
  const token = (await cookies()).get("login@solvus-token")?.value;

  try {
    const { data } = await axios.post<LeadsResponse>(
      "https://app.solvus.io/rest/leads",
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
