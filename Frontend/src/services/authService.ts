import { authApi } from "./api";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const response = await authApi.post("/login", data);
    return response.data;
  },
  logout: async () => {
    const response = await authApi.post("/logout");
    return response.data;
  },
};
