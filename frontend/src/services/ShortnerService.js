import axios, * as others from "axios";
import { getBaseUrl } from "./BaseUrl";

const instance = axios.create({
  baseURL: getBaseUrl(),
});

export async function getWelcomeMessage() {
  try {
    const response = await instance.get("/");
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getShortenedURL(url) {
  const response = await instance.post("/url", { target_url: url });
  return response.data;
}
