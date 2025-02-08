"use client";

import Header from "@/components/header";
import { getUsers } from "@/queries/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
      <Header />
      <h1>Usuários</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Nome</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Cargo</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  <Link href={`/users/${user.id}`} style={{ textDecoration: "none", color: "blue" }}>
                    {user.name}
                  </Link>
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{user.email}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
