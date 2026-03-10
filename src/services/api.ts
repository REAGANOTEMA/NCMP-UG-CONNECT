export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic fetch helper
export async function fetchJSON(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem("token"); // JWT token
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { headers, ...options });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  return res.json();
}