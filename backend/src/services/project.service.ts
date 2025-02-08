import { prisma } from "../prisma";

const listProject = async (filter: { name?: string; status?: string }) => {
  const { name, status } = filter;

  const projects = await prisma.project.findMany({
    where: {
      deletedAt: null,
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
      deletedAt: null,
    },
    include: {
      manager: true,
      tasks: true,
    },
  });

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
  const project = await prisma.project.update({
    where: {
      id,
      deletedAt: null,
    },
    data,
  });

  return project;
};

const deleteProject = async (id: string) => {
  await prisma.project.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export { listProject, getProject, createProject, updateProject, deleteProject };
