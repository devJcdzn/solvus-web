"use server";

import { Time, Usuario } from "@/app/(public)/(auth)/types/user-data";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

export async function getProfileInfo(): Promise<{
  usuario: Usuario;
  time: Time;
} | null> {
  const token =
    (await cookies()).get("login@solvus-token")?.value ||
    (await cookies()).get("admin@solvus-token")?.value;

  try {
    const { data } = await api.post<{ usuario: Usuario; time: Time }>(
      "/profile",
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    const userCookie = (await cookies()).get("userinfo");
    if (!userCookie) throw new Error("Error to fetch userData");

    try {
      const parsed = JSON.parse(userCookie.value);
      return parsed as { usuario: Usuario; time: Time };
    } catch {
      return null;
    }
  }
}

export async function updateProfileInfo({
  email,
  name,
}: {
  email?: string;
  name?: string;
}) {
  const token = (await cookies()).get("login@solvus-token")?.value;
  if (!token) throw new Error("No authentication token found");

  try {
    const { data } = await api.put("/profile", {
      Authorization: `Bearer ${token}`,
      email,
      nome: name,
    });

    const userCookie = (await cookies()).get("userinfo");
    if (!userCookie) throw new Error("No user info found");

    const parsed = JSON.parse(userCookie.value) as {
      usuario: Usuario;
      time: Time;
    };

    const updatedUsuario = {
      ...parsed.usuario,
      nome: name ?? parsed.usuario.nome,
      email: email ?? parsed.usuario.email,
    };

    const newData = {
      ...parsed,
      usuario: updatedUsuario,
    };

    (await cookies()).set("userinfo", JSON.stringify(newData), {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return data;
  } catch (err) {
    console.error("Error updating profile:", err);
    throw err;
  }
}
