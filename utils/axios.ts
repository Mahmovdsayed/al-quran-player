"use server";
import axios from "axios";

axios.defaults.headers.get["Accept"] = "application/json";

export const api = axios.create({
  baseURL: "https://api.quran.com/api/v4",
});
