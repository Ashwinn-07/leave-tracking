import type { StateCreator } from "zustand";
import type { ILeaveType } from "../../types/leaveType";
import { leaveTypeService } from "../../services/leaveTypeService";
import type { AuthSlice } from "./authSlice";

export interface LeaveTypeSlice {
  types: ILeaveType[];
  typesLoading: boolean;
  typesError: string | null;
  fetchTypes: () => Promise<void>;
  createType: (data: {
    name: string;
    description?: string;
    maxDays: number;
    accrualRate: number;
    halfDayAllowed?: boolean;
  }) => Promise<void>;
}

export const createLeaveTypeSlice: StateCreator<
  AuthSlice & LeaveTypeSlice,
  [],
  [],
  LeaveTypeSlice
> = (set, get) => ({
  types: [],
  typesLoading: false,
  typesError: null,

  fetchTypes: async () => {
    const { authType } = get();
    if (!authType) throw new Error("Not authenticated");

    set({ typesLoading: true, typesError: null });
    try {
      const types = await leaveTypeService.list();
      set({ types });
    } catch (err: any) {
      set({ typesError: err.message });
    } finally {
      set({ typesLoading: false });
    }
  },

  createType: async (data) => {
    const { authType } = get();
    if (authType !== "admin") {
      throw new Error("Only admins may create leave types");
    }

    set({ typesLoading: true, typesError: null });
    try {
      const newType = await leaveTypeService.create(data);
      set((state) => ({ types: [...state.types, newType] }));
    } catch (err: any) {
      set({ typesError: err.message });
      throw err;
    } finally {
      set({ typesLoading: false });
    }
  },
});
