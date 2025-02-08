import { axiosInstance } from ".";

export interface Project {
  id?: string;
  name: string;
  status: string;
  description: string;
  managerId: string;
}

const getProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance.get<Project[]>("projects/");

  return response.data;
};

const getProject = async (id: string): Promise<Project> => {
  const response = await axiosInstance.get<Project>(`projects/${id}`);

  return response.data;
};

const createProject = async (data: Project): Promise<Project> => {
  const response = await axiosInstance.post<Project>("projects/", data);

  return response.data;
};

const updateProject = async (data: Project): Promise<Project> => {
  const response = await axiosInstance.put<Project>(
    `projects/${data.id}`,
    data
  );

  return response.data;
};

export { getProjects, createProject, getProject, updateProject };
