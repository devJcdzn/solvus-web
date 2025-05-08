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
    // const { data } = await axios.post<UserData>(process.env.API_URL || "", {
    //   email,
    //   senha: password,
    // });

    const data: UserData = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDY2NjAzMDEsImV4cCI6MTc0NjY2MzkwMSwidWlkIjoiMjAiLCJlbWFpbCI6ImxvcGVzamVhbjgxQGdtYWlsLmNvbSIsIm5vbWUiOiJKZWFuIENhcmxvcyJ9.3qtLxF2pZfaLnHPdBepDSjYJcLZmNQJ_04AxsZ040Zw",
      usuario: {
        id: "20",
        nome: "Jean Carlos",
        email: "lopesjean81@gmail.com",
      },
      time: {
        id: "1",
        logo: "uploads/images/logo-solvus.png",
        nome: "Solvus",
        cor_primaria: "#8A2BE2",
        cor_secundaria: "#8a2be2",
        project_id: "proj_emBK9G1SxAtGhUjXApHhWIVF",
      },
    };

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

  try {
    const parsed = JSON.parse(userCookie.value);
    return parsed as { usuario: Usuario; time: Time };
  } catch {
    return null;
  }
}
