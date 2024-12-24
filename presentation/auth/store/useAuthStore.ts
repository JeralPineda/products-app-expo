import { create } from "zustand";

import { User } from "@/core/auth/interface/user";
import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-actions";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-store.adapter";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;

  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Properties
  status: "checking",
  token: undefined,
  user: undefined,

  //Actions
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({
      status: "authenticated",
      token,
      user,
    });

    await SecureStorageAdapter.setItem("token", token);

    return true;
  },

  register: async (email: string, password: string, fullName: string) => {
    const resp = await authRegister(email, password, fullName);
    return get().changeStatus(resp?.token, resp?.user);
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
