"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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

      <button
        onClick={() => {
          signIn("keycloak");
        }}
      >
        Login
      </button>
    </div>
  );
}
