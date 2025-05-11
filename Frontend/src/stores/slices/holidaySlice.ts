import type { StateCreator } from "zustand";
import type { AuthSlice } from "./authSlice";
import { holidayService } from "../../services/holidayService";
import type { IHoliday } from "../../types/holiday";

export interface HolidaySlice {
  fetchHolidays: () => Promise<void>;
  createHoliday: (data: { name: string; date: string }) => Promise<IHoliday>;
  updateHoliday: (
    id: string,
    data: { name?: string; date?: string }
  ) => Promise<IHoliday>;
  deleteHoliday: (id: string) => Promise<void>;
}

export const createHolidaySlice: StateCreator<
  AuthSlice & HolidaySlice,
  [],
  [],
  HolidaySlice
> = (_, get) => ({
  fetchHolidays: async () => {
    const { isAuthenticated } = get();
    if (!isAuthenticated) {
      throw new Error("You need to be authenticated to perform this action");
    }
    return await holidayService.list();
  },

  createHoliday: async (data) => {
    const { authType } = get();
    if (authType !== "admin") {
      throw new Error("Only admins can create holidays");
    }
    return await holidayService.create(data);
  },

  updateHoliday: async (id, data) => {
    const { authType } = get();
    if (authType !== "admin") {
      throw new Error("Only admins can update holidays");
    }
    return await holidayService.update(id, data);
  },

  deleteHoliday: async (id) => {
    const { authType } = get();
    if (authType !== "admin") {
      throw new Error("Only admins can delete holidays");
    }
    await holidayService.remove(id);
  },
});
