"use server";

import { api } from "@/lib/api";
import { getAuthToken } from "../auth/actions";
import { IntegrationsResponse } from "./types";

export async function getIntegrations() {
  const token = await getAuthToken();

  console.log(token);

  const { data } = await api.post<IntegrationsResponse>("/integrations", {
    Authorization: `Bearer ${token}`,
  });

  return data;
}
