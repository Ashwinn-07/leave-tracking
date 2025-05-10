import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slices/authSlice";
import {
  createLeaveRequestSlice,
  type LeaveRequestSlice,
} from "./slices/leaveRequestSlice";
import {
  createLeaveTypeSlice,
  type LeaveTypeSlice,
} from "./slices/leaveTypeSlice";

export type StoreState = AuthSlice & LeaveRequestSlice & LeaveTypeSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createLeaveRequestSlice(...a),
      ...createLeaveTypeSlice(...a),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        authType: state.authType,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
