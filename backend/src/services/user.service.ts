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

export { listUsers, getUser, createUser };
