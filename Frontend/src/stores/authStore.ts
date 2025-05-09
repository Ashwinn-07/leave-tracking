import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/authService";
import type { IUser } from "../types/user";

interface AuthState {
  user: IUser | null;
  authType: "employee" | "manager" | "admin" | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authType: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { user } = await authService.login({ email, password });

        const authType = user.role;

        sessionStorage.setItem("auth-type", authType);
        set({ user, authType, isAuthenticated: true });
      },
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
