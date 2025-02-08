"use client";

import { ProjectForm } from "@/components/projectForm";
import { getProject, Project } from "@/queries/projects";
import { useQuery } from "@tanstack/react-query";
import { use, useState } from "react";

interface ProjectParams {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectParams) {
  const [isEditing, setIsEditing] = useState(false);

  const { id } = use(params);

  const {} = useQuery<Project>({
    queryKey: ["projects"],
    queryFn: () => getProject(id),
  });

  if (isEditing)
    return (
      <div>
        <ProjectForm id={id} setIsEditing={setIsEditing} />
      </div>
    );

  return (
    <div>
      <button onClick={() => setIsEditing(true)}>Editar</button>
      Projects {id}
    </div>
  );
}
