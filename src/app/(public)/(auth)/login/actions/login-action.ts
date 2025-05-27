"use server";

import { Time, UserData, Usuario } from "@/app/(public)/(auth)/types/user-data";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

const expires = 60 * 60 * 24; // 7 dias

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
    const { data } = await api.post<UserData>("/login", {
      email,
      senha: password,
    });

    (await cookies()).set("login@solvus-token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: expires, 
    });

    await setUserInfo(data.usuario, data.time);

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
  store.delete("login@solvus-token");
  store.delete("userinfo");
}

export async function setUserInfo(usuario: Usuario, time: Time) {
  const payload = JSON.stringify({ usuario, time });

  (await cookies()).set("userinfo", payload, {
    path: "/",
    sameSite: "lax",
    maxAge: expires,
  });
}

export async function getSessionData() {
  const userCookie = (await cookies()).get("userinfo");
  if (!userCookie) return null;

  try {
    const parsed = JSON.parse(userCookie.value);
    return parsed as { usuario: Usuario; time: Time };
  } catch {
    return null;
  }
}
