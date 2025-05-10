import { adminApi } from "./api";

export const leaveTypeService = {
  list: async () => {
    const response = await adminApi.get("/leave-types");
    return response.data;
  },
  create: async (data: {
    name: string;
    description?: string;
    maxDays: number;
    accrualRate: number;
    halfDayAllowed?: boolean;
  }) => {
    const response = await adminApi.post("/leave-type", data);
    return response.data;
  },
};
