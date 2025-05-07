"use server";

import axios from "axios";
import { cookies } from "next/headers";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function login(_formState: any, formData: FormData) {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	console.log(process.env.API_URL);

	console.log({ email, password });

	if (!email || !password) {
		return {
			success: false,
			message: "preencha os campos corretamente",
		};
	}

	try {
		const { data } = await axios.post<{ token: string }>(
			process.env.API_URL || "",
			{
				email,
				senha: password,
			},
		);

		console.table({ data });

		(await cookies()).set("login@solvus-token", data.token);

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
