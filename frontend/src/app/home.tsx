"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function keycloakSessionLogout() {
  try {
    await fetch("/api/auth/logout", {
      method: "GET",
    });
  } catch (error) {
    console.error("Failed to logout", error);
  }
}

export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    redirect("/projects");
  }

  return (
    <div>
      <h1>Session</h1>
      <p>Session: {JSON.stringify(session)}</p>
      <p>Status: {status}</p>
      {session ? (
        <button
          onClick={() => {
            keycloakSessionLogout().then(() => signOut({ callbackUrl: "/" }));
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            signIn("keycloak");
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}
