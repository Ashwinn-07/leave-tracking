import type { StateCreator } from "zustand";
import type { IUser } from "../../types/user";
import { authService } from "../../services/authService";

export interface AuthSlice {
  user: IUser | null;
  authType: "employee" | "manager" | "admin" | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  authType: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const { user } = await authService.login({ email, password });
    const authType = user.role;

    sessionStorage.setItem("auth-type", authType);
    set({ user, authType, isAuthenticated: true });
  },
});
