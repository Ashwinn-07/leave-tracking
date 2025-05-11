import type { StateCreator } from "zustand";
import type { AuthSlice } from "./authSlice";
import { attendanceService } from "../../services/attendanceService";
import type { IAttendance } from "../../types/attendance";

export interface AttendanceSlice {
  clockIn: () => Promise<IAttendance>;
  clockOut: () => Promise<IAttendance>;
  fetchMyAttendance: () => Promise<IAttendance[]>;
  fetchPendingEdits: () => Promise<IAttendance[]>;
  approveAttendance: (
    id: string,
    status: "approved" | "rejected",
    comments?: string
  ) => Promise<void>;
}

export const createAttendanceSlice: StateCreator<
  AuthSlice & AttendanceSlice,
  [],
  [],
  AttendanceSlice
> = (_set, get) => ({
  clockIn: async () => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may clock in");
    }
    return await attendanceService.clockIn();
  },

  clockOut: async () => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may clock out");
    }
    return await attendanceService.clockOut();
  },

  fetchMyAttendance: async () => {
    const { authType } = get();
    if (authType !== "employee") {
      throw new Error("Only employees may view attendance");
    }
    return await attendanceService.listMy();
  },

  fetchPendingEdits: async () => {
    const { authType } = get();
    if (authType !== "manager") {
      throw new Error("Only managers may view pending attendance edits");
    }
    return await attendanceService.listPending();
  },

  approveAttendance: async (id, status, comments) => {
    const { authType } = get();
    if (authType !== "manager") {
      throw new Error("Only managers may approve attendance");
    }
    return await attendanceService.approve({ id, status, comments });
  },
});
