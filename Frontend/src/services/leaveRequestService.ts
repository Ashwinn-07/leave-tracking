import { employeeApi, managerApi } from "./api";

export const leaveRequestService = {
  request: async (data: {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    halfDay?: boolean;
    comments?: string;
  }) => {
    const response = await employeeApi.post("/request", data);
    return response.data;
  },
  list: async () => {
    const response = await employeeApi.get("/status");
    return response.data;
  },
  cancel: async (requestId: string) => {
    const response = await employeeApi.post("/cancel", { requestId });
    return response.data;
  },
  listPending: async () => {
    const response = await managerApi.get("/leave/pending");
    return response.data;
  },
  approve: async (params: {
    id: string;
    status: "approved" | "rejected";
    comments?: string;
  }) => {
    const response = await managerApi.post("/leave/approve", params);
    return response.data;
  },
};
