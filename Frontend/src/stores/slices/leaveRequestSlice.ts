import type { StateCreator } from "zustand";
import type { ILeaveRequest } from "../../types/leaveRequest";
import { leaveRequestService } from "../../services/leaveRequestService";
import type { AuthSlice } from "./authSlice";

export interface LeaveRequestSlice {
  requests: ILeaveRequest[];
  reqLoading: boolean;
  reqError: string | null;
  fetchRequests: () => Promise<void>;
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
> = (set, get) => ({
  requests: [],
  reqLoading: false,
  reqError: null,

  fetchRequests: async () => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may view their leave requests");
    }

    set({ reqLoading: true, reqError: null });
    try {
      const requests = await leaveRequestService.list();
      set({ requests });
    } catch (err: any) {
      set({ reqError: err.message });
    } finally {
      set({ reqLoading: false });
    }
  },

  submitRequest: async (data) => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may submit leave requests");
    }

    set({ reqLoading: true, reqError: null });
    try {
      await leaveRequestService.request(data);
      await get().fetchRequests();
    } catch (err: any) {
      set({ reqError: err.message });
      throw err;
    } finally {
      set({ reqLoading: false });
    }
  },

  cancelRequest: async (id) => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may cancel leave requests");
    }

    set({ reqLoading: true, reqError: null });
    try {
      await leaveRequestService.cancel(id);
      await get().fetchRequests();
    } catch (err: any) {
      set({ reqError: err.message });
      throw err;
    } finally {
      set({ reqLoading: false });
    }
  },
});
