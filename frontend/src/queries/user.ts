import { axiosInstance } from ".";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const getUsers = async (): Promise<User[]> =>{
  const response = await axiosInstance.get<User[]>("users/");

  return response.data;
}

export { getUsers };
