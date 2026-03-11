export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchJSON(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { headers, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}