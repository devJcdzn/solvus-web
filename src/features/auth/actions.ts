"use server";
import { cookies } from "next/headers";

export async function getAuthToken(isAdmin = false) {
  if (isAdmin) {
    return (await cookies()).get("admin@solvus-token")?.value;
  }

  return (await cookies()).get("login@solvus-token")?.value;
}
