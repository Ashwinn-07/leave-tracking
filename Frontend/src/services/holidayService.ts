import { adminApi } from "./api";

export const holidayService = {
  list: async () => {
    const response = await adminApi.get("/holidays");
    return response.data;
  },

  create: async (data: { name: string; date: string }) => {
    const response = await adminApi.post("/holiday", data);
    return response.data;
  },

  update: async (id: string, data: { name?: string; date?: string }) => {
    const response = await adminApi.put(`/holiday/${id}`, data);
    return response.data;
  },

  remove: async (id: string) => {
    const response = await adminApi.delete(`/holiday/${id}`);
    return response.data;
  },
};
