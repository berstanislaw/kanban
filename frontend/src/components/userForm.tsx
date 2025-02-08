import { createUser, getUser, updateUser } from "@/queries/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface UserFormProps {
  id?: string;
  initialData?: {
    name: string;
    email: string;
    role: string;
  };
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}

export const UserForm = ({ id, initialData, setIsEditing }: UserFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const { data: userData } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const mutation = useMutation({
    mutationFn: !!id ? updateUser : createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      if (id) {
        setIsEditing!(false);
      } else {
        router.push("/users");
      }
    },
  });

  const onSubmit = (data: { name: string; email: string; role: string }) => {
    mutation.mutate({
      id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", width: "300px" }}
    >
      <input
        type="text"
        placeholder="Nome"
        {...register("name", { required: true })}
      />
      {errors.name && <span>Nome é obrigatório</span>}

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>Email é obrigatório</span>}

      <input
        type="text"
        placeholder="Cargo"
        {...register("role", { required: true })}
      />
      {errors.role && <span>Cargo é obrigatório</span>}

      <div>
        <button type="submit">{id ? "Editar Usuário" : "Criar Usuário"}</button>
        <button
          onClick={() => (id ? setIsEditing!(false) : router.push("/users"))}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
