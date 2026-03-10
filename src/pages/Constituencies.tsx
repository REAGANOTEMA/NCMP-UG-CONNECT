// src/pages/Constituencies.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/services/api";

export default function Constituencies() {
  const { data: regions, isLoading } = useQuery(
    ["constituencies"],
    () => fetchJSON("/constituencies")
  );

  if (isLoading) return <p>Loading constituencies…</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Constituencies of Uganda — 2026</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regions.map((c: any) => (
          <div key={c.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p>District: {c.district}</p>
            <p>Region: {c.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}