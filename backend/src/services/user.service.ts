import { prisma } from "../prisma";
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
    throw new Error("Usuário não encontrado");
  }

  return user;
};

const createUser = async (data: {
  name: string;
  email: string;
  role: string;
  password: string;
}) => {
  const { email, password, name, role } = data;

  await createKeycloakClient({ email: email, password: password });

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
    email: data.email!,
    password: "",
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

export { listUsers, getUser, createUser, updateUser, deleteUser };
