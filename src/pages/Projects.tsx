// src/pages/Projects.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/services/api";

export default function Projects() {
  const { data: projects, isLoading } = useQuery(
    ["projects"],
    () => fetchJSON("/projects")
  );

  if (isLoading) return <p>Loading official projects…</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">National Development Projects — 2026</h1>

      {projects.map((proj: any) => (
        <div key={proj.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{proj.title}</h2>
          <p>Location: {proj.location}</p>
          <p>Status: {proj.status}</p>
          <p>Expected Completion: {proj.expectedCompletion}</p>
          <p>Managed by: {proj.responsibleMinistry}</p>
        </div>
      ))}
    </div>
  );
}