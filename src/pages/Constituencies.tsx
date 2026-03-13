import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/services/api";

export default function Constituencies() {
  const { data: regions, isLoading } = useQuery({
    queryKey: ["constituencies"],
    queryFn: () => fetchJSON("/constituencies")
  });

  if (isLoading) return <p className="p-8 text-center">Loading constituencies…</p>;

  const regionsList = Array.isArray(regions) ? regions : [];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold font-display text-gold">Constituencies of Uganda — 2026</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionsList.map((c: any) => (
          <div key={c.id} className="ncmp-card p-4">
            <h2 className="text-xl font-semibold text-foreground">{c.name}</h2>
            <p className="text-sm text-muted-foreground">District: {c.district}</p>
            <p className="text-sm text-gold">Region: {c.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}