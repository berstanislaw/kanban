import { axiosInstance } from ".";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("users/");

  return response.data;
};

const getUser = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`users/${id}/`);

  return response.data;
};

const createUser = async (data: User): Promise<User> => {
  const response = await axiosInstance.post<User>("users/", data);

  return response.data;
};

const updateUser = async (data: User): Promise<User> => {
  const response = await axiosInstance.put<User>(`users/${data.id}/`, data);

  return response.data;
};

export { getUsers, getUser, createUser, updateUser };
