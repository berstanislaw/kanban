import { prisma } from "../prisma";

const listUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
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
