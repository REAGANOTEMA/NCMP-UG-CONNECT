// src/services/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchJSON(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}