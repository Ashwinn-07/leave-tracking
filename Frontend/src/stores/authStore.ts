import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./slices/authSlice";

export type StoreState = AuthSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
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
