import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/services/api";

export default function Parliament() {
  const { data: mps, isLoading } = useQuery({
    queryKey: ["mpProfiles"],
    queryFn: () => fetchJSON("/mp-profiles")
  });

  if (isLoading) return <p className="p-8 text-center">Loading MPs from official registry…</p>;

  const mpsList = Array.isArray(mps) ? mps : [];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold font-display text-gold">Parliament of Uganda — 2026</h1>
      <p className="text-muted-foreground">Official list of Members of Parliament sourced directly from government records.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mpsList.map((mp: any) => (
          <div key={mp.id} className="ncmp-card p-4">
            <img src={mp.profilePhoto} alt={mp.fullName} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold text-foreground">{mp.fullName}</h2>
            <p className="text-sm text-gold">{mp.constituency}, {mp.district}</p>
            <p className="text-xs text-muted-foreground mt-2">Party: {mp.politicalParty}</p>
            <p className="text-xs text-muted-foreground">Committees: {mp.committees?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}