import { prisma } from "../prisma";

const listProject = async (filter: { name?: string; status?: string }) => {
  const { name, status } = filter;

  const projects = await prisma.project.findMany({
    where: {
      name: {
        contains: name,
      },
      status: status,
    },
  });

  return projects;
};

const getProject = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      manager: true,
      tasks: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

const createProject = async (data: {
  name: string;
  description: string;
  status: string;
  managerId: string;
}) => {
  const project = await prisma.project.create({
    data,
  });

  return project;
};

const updateProject = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    status?: string;
    managerId?: string;
  }
) => {
  await getProject(id);

  const project = await prisma.project.update({
    where: {
      id,
    },
    data,
  });

  return project;
};

const deleteProject = async (id: string) => {
  await getProject(id);

  await prisma.project.delete({
    where: {
      id,
    },
  });
};

export { listProject, getProject, createProject, updateProject, deleteProject };
