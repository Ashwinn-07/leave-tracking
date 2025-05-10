import type { StateCreator } from "zustand";
import type { AuthSlice } from "./authSlice";
import { leaveRequestService } from "../../services/leaveRequestService";
import type { ILeaveRequest } from "../../types/leaveRequest";

export interface LeaveRequestSlice {
  fetchRequests: () => Promise<ILeaveRequest[]>;
  submitRequest: (data: {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    halfDay?: boolean;
    comments?: string;
  }) => Promise<void>;
  cancelRequest: (id: string) => Promise<void>;
}

export const createLeaveRequestSlice: StateCreator<
  AuthSlice & LeaveRequestSlice,
  [],
  [],
  LeaveRequestSlice
> = (_set, get) => ({
  fetchRequests: async () => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may view their leave requests");
    }

    return await leaveRequestService.list();
  },

  submitRequest: async (data) => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may submit leave requests");
    }

    await leaveRequestService.request(data);
  },

  cancelRequest: async (id) => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may cancel leave requests");
    }

    await leaveRequestService.cancel(id);
  },
});
