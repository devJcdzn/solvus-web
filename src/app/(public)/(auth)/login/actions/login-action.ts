"use server";

import { Time, UserData, Usuario } from "@/app/(public)/(auth)/types/user-data";
import { api } from "@/lib/api";
import axios from "axios";
import { cookies } from "next/headers";

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
    
    const { data: response } = await api.post<UserData>("/login", {
      email,
      senha: password,
    });

    const data: UserData = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDY2NzU4MDcsImV4cCI6MTc0NjY3OTQwNywidWlkIjoiMTMiLCJlbWFpbCI6ImRhbmFAZ21haWwuY29tIiwibm9tZSI6IkRhbmEifQ.8Ptm3r0D7XlQ6FrCoyeeCpayh_3Jo41_U24imOIxgKY",
      usuario: {
        id: "13",
        nome: "Dana",
        email: "dana@gmail.com",
      },
      time: {
        id: "2",
        logo: "uploads/images/logo-dana.png",
        nome: "Dana",
        cor_primaria: " #088ec9",
        cor_secundaria: "#000000",
        project_id: "proj_MVnxk2FNOWg0d9KyNxDjSTAz",
      },
    };

    (await cookies()).set("login@solvus-token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
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
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSessionData() {
  const userCookie = (await cookies()).get("userinfo");
  if (!userCookie) return null;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const parsed = JSON.parse(userCookie.value);
    return parsed as { usuario: Usuario; time: Time };
  } catch {
    return null;
  }
}
