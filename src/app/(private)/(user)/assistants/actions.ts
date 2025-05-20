"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { AssistantsData } from "./types";

export async function getAssistants() {
  try {
    const token = (await cookies()).get("login@solvus-token")?.value;

    const { data } = await axios.post<AssistantsData>(
      `https://app.solvus.io/rest/assistants`,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}
