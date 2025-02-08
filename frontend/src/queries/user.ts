import { AxiosResponse } from "axios";
import { axiosInstance } from ".";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const getUsers = async (): Promise<AxiosResponse<User[]>> =>
  await axiosInstance.get<User[]>("users/");

export { getUsers };
