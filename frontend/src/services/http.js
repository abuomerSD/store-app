import axios from "axios";
import { API_URL } from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

export const http = {
  get: async (url) => {
    const res = await axiosInstance.get(url);
    return res.data;
  },
  post: async (url, data) => {
    const res = await axiosInstance.post(url, data);
    return res.data;
  },
  put: async (url, id, data) => {
    const res = await axiosInstance.put(`${url}/${id}`, data);
    return res.data;
  },
  delete: async (url, id) => {
    const res = await axiosInstance.delete(`${url}/${id}`);
    return res.data;
  },
};
