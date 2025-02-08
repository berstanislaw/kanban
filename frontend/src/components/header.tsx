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
    <div className="bg-lightblue flex justify-between flex-row p-4 relative">
      <div>Header</div>
      {session && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-transparent border-none cursor-pointer"
          >
            <MoreVertical size={24} />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
              <button
                onClick={() => router.push("/projects")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Projects
              </button>
              <button
                onClick={() => router.push("/users")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Users
              </button>
              <button
                onClick={() => {
                  keycloakSessionLogout().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
