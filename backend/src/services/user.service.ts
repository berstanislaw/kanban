import { prisma } from "../prisma";

const listUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });

  return users;
};

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });

  return user;
};

const createUser = async (data: {
  name: string;
  email: string;
  role: string;
}) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    role?: string;
  }
) => {
  const user = await prisma.user.update({
    where: {
      id,
      deletedAt: null,
    },
    data,
  });

  return user;
};

const deleteUser = async (id: string) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export { listUsers, getUser, createUser, updateUser, deleteUser };
