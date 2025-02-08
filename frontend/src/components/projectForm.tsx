import { createProject, getProject, updateProject } from "@/queries/projects";
import { getUsers, User } from "@/queries/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface ProjectFormProps {
  id?: string;
  initialData?: {
    name: string;
    description: string;
    managerId: string;
    status: string;
  };
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}

export const ProjectForm = ({
  id,
  initialData,
  setIsEditing,
}: ProjectFormProps) => {
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

  const { data: users, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  const { data: projectData } = useQuery({
    queryKey: ["project"],
    queryFn: () => getProject(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (projectData) {
      reset(projectData);
    }
  }, [projectData, reset]);

  const mutation = useMutation({
    mutationFn: !!id ? updateProject : createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if (id) {
        setIsEditing!(false);
      } else {
        router.push("/projects");
      }
    },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    managerId: string;
    status: string;
  }) => {
    mutation.mutate({
      id,
      name: data.name,
      description: data.description,
      managerId: data.managerId,
      status: data.status,
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
        type="text"
        placeholder="Descrição"
        {...register("description", { required: true })}
      />
      {errors.description && <span>Descrição é obrigatória</span>}

      <div>
        <label>Manager</label>
        <select {...register("managerId", { required: "Selecione o manager" })}>
          <option value="">
            {isPending ? "Carregando" : "Selecione um manager"}
          </option>
          {users &&
            users?.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
        {errors.managerId && <p>{errors.managerId.message}</p>}
      </div>

      <div>
        <label>Status</label>
        <select {...register("status", { required: "Selecione o status" })}>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <div>
        <button type="submit">{id ? "Editar Projeto" : "Criar Projeto"}</button>
        <button
          onClick={() => (id ? setIsEditing!(false) : router.push("/projects"))}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
