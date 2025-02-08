import NextAuth, { NextAuthOptions } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encrypt";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Keycloak({
      issuer: "http://localhost:8080/realms/kanban",
      clientId: "front-end",
      clientSecret: "BEJLF4fpWB4kEs0RXYXdUcVbzQVF3ueJ",
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);

      if (account) {
        token.decodedToken = jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;

        return token;
      } else if (now < token.expires_at) {
        // token is still valid

        return token;
      } else {
        // TODO refresh token
        return token;
      }
    },
    async session({ session, token }) {
      session.access_token = encrypt(token.access_token);
      session.id_token = encrypt(token.id_token);
      session.roles = token.decodedToken.realm_access.roles;

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
