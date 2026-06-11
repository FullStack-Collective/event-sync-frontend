import { fetchUtils } from "react-admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const httpClient = (url: string, options: any = {}) => {
  const token = localStorage.getItem("token");
  
  options.headers = new Headers({ Accept: "application/json" });
  
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  
  if (options.body) {
    options.headers.set("Content-Type", "application/json");
  }
  
  return fetchUtils.fetchJson(url, options);
};

export { API_URL };