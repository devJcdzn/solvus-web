"use server";

import { Time, UserData, Usuario } from "@/app/(public)/(auth)/types/user-data";
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
    const { data } = await axios.post<UserData>(process.env.API_URL || "", {
      email,
      senha: password,
    });

    console.table({ data });

    (await cookies()).set("login@solvus-token", data.token);
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

export async function setUserInfo(user: Usuario, team: Time) {
  const payload = JSON.stringify({ user, team });

  (await cookies()).set("userinfo", payload, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSessionData() {
	const userCookie = (await cookies()).get('userinfo')
	if (!userCookie) return null
  
	try {
	  const parsed = JSON.parse(userCookie.value)
	  return parsed as { usuario: Usuario; time: Time }
	} catch {
	  return null
	}
  }