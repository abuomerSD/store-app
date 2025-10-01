import axios from "axios";
import { API_URL } from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const http = {
  get: async (url: string) => {
    return await axiosInstance.get(url);
  },
  post: async (url: string, data: object | null) => {
    return await axiosInstance.post(url, data);
  },
  put: async (url: string, id: string, data: object | null) => {
    return await axiosInstance.put(`${url}/${id}`, data);
  },
  delete: async (url: string, id: string) => {
    return axiosInstance.delete(`${url}/${id}`);
  },
};
