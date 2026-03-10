// src/pages/Parliament.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/services/api";

export default function Parliament() {
  const { data: mps, isLoading } = useQuery(
    ["mpProfiles"],
    () => fetchJSON("/mp-profiles")
  );

  if (isLoading) return <p>Loading MPs from official registry…</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Parliament of Uganda — 2026</h1>
      <p>Official list of Members of Parliament sourced directly from government records.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mps.map((mp: any) => (
          <div key={mp.id} className="border rounded shadow p-4">
            <img src={mp.profilePhoto} alt={mp.fullName} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold">{mp.fullName}</h2>
            <p>{mp.constituency}, {mp.district}</p>
            <p>Party: {mp.politicalParty}</p>
            <p>Committees: {mp.committees.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}