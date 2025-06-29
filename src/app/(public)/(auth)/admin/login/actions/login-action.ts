"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { UserData, Usuario } from "../../../types/user-data";
import { Time } from "@/features/dashboard/types";

const expires = 60 * 60 * 24 * 7; // 7 dias

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function login(_formState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "preencha os campos corretamente",
    };
  }

  try {
    const { data } = await api.post<UserData>("/loginAdmin", {
      email,
      senha: password,
    });

    (await cookies()).set("admin@solvus-token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: expires,
    });

    await setAdminInfo(data.usuario, data.time);

    return {
      success: true,
      message: "Login efetuado",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Email ou senha inválidos.",
    };
  }
}

export async function logout() {
  const store = await cookies();
  store.delete("admin@solvus-token");
  store.delete("adminInfo");
}

export async function setAdminInfo(usuario: Usuario, time: Time) {
  const payload = JSON.stringify({ usuario, time });

  (await cookies()).set("adminInfo", payload, {
    path: "/",
    sameSite: "lax",
    maxAge: expires,
  });
}


export async function getSessionData() {
  const userCookie = (await cookies()).get("adminInfo");
  if (!userCookie) return null;

  try {
    const parsed = JSON.parse(userCookie.value);
    return parsed as { usuario: Usuario; time: Time };
  } catch {
    return null;
  }
}
