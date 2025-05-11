import { employeeApi, managerApi } from "./api";

export const attendanceService = {
  clockIn: async () => {
    const response = await employeeApi.post("/clock-in");
    return response.data;
  },

  clockOut: async () => {
    const response = await employeeApi.post("/clock-out");
    return response.data;
  },

  listMy: async () => {
    const response = await employeeApi.get("/my");
    return response.data;
  },

  listPending: async () => {
    const response = await managerApi.get("/attendance/pending");
    return response.data;
  },

  approve: async (params: {
    id: string;
    status: "approved" | "rejected";
    comments?: string;
  }) => {
    const response = await managerApi.post("/attendance/approve", params);
    return response.data;
  },
};
