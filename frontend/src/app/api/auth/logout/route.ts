import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../[...nextauth]/route";
import { decrypt } from "@/utils/encrypt";
import { jwtDecode } from "jwt-decode";

async function GET() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const { id_token } = session;

    const token = decrypt(id_token);

    const url = `${process.env.NEXTAUTH_LOGOUT_URL}?id_token_hint=${token}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      console.log(response);
    } catch (error) {
      console.error(error);
      return new Response({ status: 500 });
    }
  }
}

export { GET };
