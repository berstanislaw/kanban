"use client";

import Header from "@/components/header";
import { ProjectForm } from "@/components/projectForm";
import { getProject, Project } from "@/queries/projects";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

interface ProjectParams {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectParams) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { id } = use(params);

  const { data: project, isPending } = useQuery<Project>({
    queryKey: ["projects"],
    queryFn: () => getProject(id),
  });

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (isEditing)
    return (
      <div>
        <Header />
        <ProjectForm id={id} setIsEditing={setIsEditing} />
      </div>
    );

  return (
    <>
      <Header />
      <button onClick={() => router.push("/projects")}>Voltar</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>{project?.name}</h3>
        <p>{project?.description}</p>
        <p>{project?.status}</p>
        <p>{project?.managerId}</p>
        <p>{project?.id}</p>

        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button>Deletar</button>
      </div>
    </>
  );
}
