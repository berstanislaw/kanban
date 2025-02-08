"use client";

import { getUsers } from "@/queries/user";
import { useQuery } from "@tanstack/react-query";

export default function Users() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      Users
      <div style={{ display: "flex", flexDirection: "column" }}>
        {users &&
          users.map((user) => (
            <div key={user.id}>
              {user.name}
              {user.email}
              {user.role}
            </div>
          ))}
      </div>
    </div>
  );
}
