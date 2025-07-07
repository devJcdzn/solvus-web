"use server";

import { cookies } from "next/headers";
import { AssistantsData } from "./types";
import { api } from "@/lib/api";

export async function getAssistants() {
  try {
    const token =
      (await cookies()).get("login@solvus-token")?.value ||
      (await cookies()).get("admin@solvus-token")?.value;

    console.log(token);

    const { data } = await api.post<AssistantsData>(`/assistants`, {
      Authorization: `Bearer ${token}`,
    });

    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}
