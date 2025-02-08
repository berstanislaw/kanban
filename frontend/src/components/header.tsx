import { MoreVertical } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function keycloakSessionLogout() {
  try {
    await fetch("/api/auth/logout", {
      method: "GET",
    });
  } catch (error) {
    console.error("Failed to logout", error);
  }
}

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem",
        height: "3rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1>Kanban</h1>

      {session && (
        <div>
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreVertical size={24} />
          </button>

          {/* Menu Dropdown */}
          {isOpen && (
            <div
              style={{
                position: "absolute",
                right: "1rem",
                top: "3.1rem",
                width: "5rem",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ccc",
                border: "1px solid #ccc",
                padding: "0.5rem",
              }}
            >
              <button onClick={() => router.push("/projects")}>Projects</button>
              <button onClick={() => router.push("/users")}>Users</button>
              <button
                onClick={() => {
                  keycloakSessionLogout().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
