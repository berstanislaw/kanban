import KcAdminClient from "@keycloak/keycloak-admin-client";
import { GrantTypes } from "@keycloak/keycloak-admin-client/lib/utils/auth";

const keycloakConfig = {
  baseUrl: "http://127.0.0.1:8080",
  realmName: "master",
  username: "admin",
  password: "admin",
  grantType: "password",
  clientId: "admin-cli",
};

let adminClientInstance: KcAdminClient | null = null;

export const keycloakAdmin = async (): Promise<KcAdminClient> => {
  if (adminClientInstance) {
    return adminClientInstance;
  }

  const adminClient = new KcAdminClient({
    baseUrl: keycloakConfig.baseUrl,
    realmName: keycloakConfig.realmName,
  });

  try {
    await adminClient.auth({
      clientId: keycloakConfig.clientId,
      grantType: keycloakConfig.grantType as GrantTypes,
      username: keycloakConfig.username,
      password: keycloakConfig.password,
    });

    adminClientInstance = adminClient;
    return adminClient;
  } catch (error) {
    console.error("Erro na autenticação com Keycloak:", error);
    throw new Error("Falha na autenticação do administrador");
  }
};
