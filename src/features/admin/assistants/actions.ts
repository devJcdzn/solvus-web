"use server";

import { api } from "@/lib/api";

export async function uploadFile(formData: FormData, bucket: string) {
  try {
    const { data } = await api.post(`upload/${bucket}`, {
      formData,
    });
    return { data };
  } catch (err) {
    console.log(err);
  }
}
