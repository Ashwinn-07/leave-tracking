import { employeeApi } from "./api";

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
};
