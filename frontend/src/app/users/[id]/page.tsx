"use client";

// Supondo que você tenha essa função configurada para buscar um usuário por ID
import Header from "@/components/header";
import { UserForm } from "@/components/userForm";
import { getUser } from "@/queries/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

interface UserDetailParams {
  params: Promise<{
    id: string;
  }>;
}

export default function UserDetail({ params }: UserDetailParams) {
  const { id } = use(params);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  if (isLoading || !user) {
    return <div>Carregando detalhes do usuário...</div>;
  }

  if (!id || isLoading || !user) {
    return <div>Erro ao carregar os dados do usuário.</div>;
  }

  if (isEditing) {
    return (
      <div>
        <Header />
        <UserForm id={id} setIsEditing={setIsEditing} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Detalhes do Usuário</h1>
        <button onClick={() => setIsEditing(true)}>Editar</button>
      </div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <h2>{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Cargo:</strong> {user.role}
        </p>
        <p>
          <strong>Data de Criação:</strong>{" "}
          {new Date(user.createdAt!).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={() => {
          router.push(`/users/`);
        }}
      >
        Voltar
      </button>
    </div>
  );
}
