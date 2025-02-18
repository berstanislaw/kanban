import { prisma } from "../prisma";
import { AppError } from "../utils/error";
import { createKeycloakClient, updateKeycloakClient } from "./keycloak.service";

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

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const createUser = async (data: {
  name: string;
  email: string;
  role: string;
  password: string;
}) => {
  const { email, password, name, role } = data;

  await createKeycloakClient({ email, password, name });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      role,
    },
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
  const persistedUser = await getUser(id);

  await updateKeycloakClient({
    oldEmail: persistedUser.email,
    email: data.email,
    name: data.name,
  });

  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return user;
};

const deleteUser = async (id: string) => {
  await getUser(id);

  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export {
  listUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
