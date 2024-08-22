'use server'
import axios from "axios";


export const api = axios.create({
  baseURL: "https://api.alquran.cloud/v1/",
  headers: {
    Accept: "application/json",
  },
});
