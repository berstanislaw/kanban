import { keycloakAdmin } from "../keycloak";

const createKeycloakClient = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  const { email, password, name } = data;

  const keycloakAdminClient = await keycloakAdmin();
  await keycloakAdminClient.users.create({
    realm: "kanban",
    username: email,
    email: email,
    firstName: name,
    credentials: [
      {
        type: "password",
        value: password,
        temporary: false,
      },
    ],
    enabled: true,
    emailVerified: true,
  });
};

const updateKeycloakClient = async (data: {
  oldEmail: string;
  email?: string;
  password?: string;
  name?: string;
}) => {
  const { email, password, oldEmail, name } = data;

  const keycloakAdminClient = await keycloakAdmin();
  const keycloakUser = await keycloakAdminClient.users.find({
    realm: "kanban",
    email: oldEmail,
  });

  const user = keycloakUser[0];
  if (!user || !user.id) {
    throw new Error("Usuário não encontrado");
  }

  await keycloakAdminClient.users.update(
    {
      realm: "kanban",
      id: user.id,
    },
    {
      ...(email && { email }),
      ...(name && { firstName: name }),
      ...(password && {
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      }),
    }
  );
};

export { createKeycloakClient, updateKeycloakClient };
