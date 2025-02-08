"use client";

import Header from "@/components/header";
import { getProjects } from "@/queries/projects";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Projects() {
  const { data: projects, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isPending || !Array.isArray(projects)) {
    return <div>Carregando...</div>;
  }

  console.log(projects);

  return (
    <div>
      <Header />
      <Link href={"projects/new"}>Novo Projeto</Link>
      {projects?.map((project) => {
        return (
          <div
            key={project.id}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Link href={`/projects/${project.id}`}>
              <h3>{project.name}</h3>
            </Link>
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
}
