"use server";

import axios from "axios";

export async function uploadFile(formData: FormData, bucket: string) {
  try {
    console.log(`https://api.solvus.io/upload/${bucket}`);
    const { data } = await axios.post(
      `https://api.solvus.io/upload/${bucket}`,
      {
        formData,
      }
    );
    return { data };
  } catch (err: any) {
    console.log(err.message);
  }
}
