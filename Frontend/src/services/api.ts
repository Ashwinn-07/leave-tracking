import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const authApi = axios.create({
  baseURL: `${API_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const employeeApi = axios.create({
  baseURL: `${API_URL}/api/employee`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const managerApi = axios.create({
  baseURL: `${API_URL}/api/manager`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const adminApi = axios.create({
  baseURL: `${API_URL}/api/admin`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
