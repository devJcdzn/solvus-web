import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const api = axios.create({
  baseURL: API_URL || "https://apiapi.solvus.io/rest",
});
