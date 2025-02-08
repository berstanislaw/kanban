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

  if (!task) {
    throw new Error("Task not found");
  }

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
  await getTask(id);

  const task = await prisma.task.update({
    where: {
      id,
    },
    data,
  });

  return task;
};

const deleteTask = async (id: string) => {
  await getTask(id);

  await prisma.task.delete({
    where: {
      id,
    },
  });
};

export { listTask, getTask, createTask, updateTask, deleteTask };
