import { prisma } from "../prisma";

const listTask = async (projectId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      projectId,
    },
  });

  return tasks;
};

const getTask = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
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
    },
    data,
  });

  return task;
};

const deleteTask = async (id: string) => {
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });

  return task;
};

export { listTask, getTask, createTask, updateTask, deleteTask };
