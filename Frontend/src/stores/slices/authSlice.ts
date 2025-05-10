import type { StateCreator } from "zustand";
import type { IUser } from "../../types/user";
import { authService } from "../../services/authService";

export interface AuthSlice {
  user: IUser | null;
  authType: "employee" | "manager" | "admin" | null;
  isAuthenticated: boolean;
  loginLoading: boolean;
  loginError: string | null;
  login: (email: string, password: string) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  authType: null,
  isAuthenticated: false,
  loginLoading: false,
  loginError: null,

  login: async (email, password) => {
    set({ loginLoading: true, loginError: null });
    try {
      const { user } = await authService.login({ email, password });
      const authType = user.role;
      sessionStorage.setItem("auth-type", authType);
      set({ user, authType, isAuthenticated: true });
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      set({ loginError: message });
      throw err;
    } finally {
      set({ loginLoading: false });
    }
  },
});
