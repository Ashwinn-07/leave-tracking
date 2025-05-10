import type { StateCreator } from "zustand";
import type { ILeaveType } from "../../types/leaveType";
import { leaveTypeService } from "../../services/leaveTypeService";
import type { AuthSlice } from "./authSlice";

export interface LeaveTypeSlice {
  fetchTypes: () => Promise<ILeaveType[]>;
  createType: (data: {
    name: string;
    description?: string;
    maxDays: number;
    accrualRate: number;
    halfDayAllowed?: boolean;
  }) => Promise<ILeaveType>;
}

export const createLeaveTypeSlice: StateCreator<
  AuthSlice & LeaveTypeSlice,
  [],
  [],
  LeaveTypeSlice
> = (_set, get) => ({
  fetchTypes: async () => {
    const { authType } = get();
    if (!authType) throw new Error("Not authenticated");

    return await leaveTypeService.list();
  },

  createType: async (data) => {
    const { authType } = get();
    if (authType !== "admin") {
      throw new Error("Only admins may create leave types");
    }

    return await leaveTypeService.create(data);
  },
});
