import { prisma } from "../prisma";

const listTask = async (projectId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      projectId,
      deletedAt: null,
    },
  });

  return tasks;
};

const getTask = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });

  return task;
};

const createTask = async (data: {
  projectId: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
}) => {
  const task = await prisma.task.create({
    data,
  });

  return task;
};

const updateTask = async (
  id: string,
  data: {
    title: string;
    description: string;
    status: string;
    assignedTo: string;
  }
) => {
  const task = await prisma.task.update({
    where: {
      id,
      deletedAt: null,
    },
    data,
  });

  return task;
};

const deleteTask = async (id: string) => {
  const task = await prisma.task.update({
    where: {
      id,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return task;
};

export { listTask, getTask, createTask, updateTask, deleteTask };
