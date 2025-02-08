import axios from "axios";
import { getSession } from "next-auth/react";

const session = await getSession();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
  },
});

export { axiosInstance };
