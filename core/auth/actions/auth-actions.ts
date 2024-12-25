import { productsApi } from "@/core/api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (data: AuthResponse): { user: User; token: string } => {
  const { token, ...user } = data;

  return { user, token };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log("🚀 auth-actions.ts -> #30 ~", error);
    // throw new Error("Error on login");
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get("/auth/check-status");

    return returnUserToken(data);
  } catch (error) {
    console.log("🚀 auth-actions.ts -> #41 ~", error);
    return null;
  }
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post("/auth/register", {
      email,
      password,
      fullName,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log("🚀 auth-actions.ts -> #62 ~", error);
    // throw new Error("Error on register");
    return null;
  }
};
