import axios from "axios";

const END_POINT = import.meta.env.VITE_BASE_PATH;

export const publicRequest = axios.create({
  baseURL: END_POINT,
  withCredentials: false,
  timeout: 60000,
});