import type { User, UserLogin, LoginDTO, RegisterDTO } from "../types/user";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";

const AUTH_API = "http://localhost:8000/auth";
const TOKEN_KEY = "movies-token";

type UserJwtPayload = {
  exp: number;
  iat: number;
  userId: number;
  username: string;
};

type UseUserType = {
  register(userData: RegisterDTO): Promise<User>;
  login(loginData: LoginDTO): Promise<void>;
  getUserFromStorage(): UserLogin | null;
};

export const useAuth = (): UseUserType => {
  const register = async (userData: RegisterDTO): Promise<User> => {
    const response = await fetch(`${AUTH_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error en registro");
    }
    const data: User & { password?: string } = await response.json();
    delete data.password;

    return data;
  };

  const login = async (loginData: LoginDTO): Promise<void> => {
    const response = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Login incorrecto");
    }

    const { accessToken } = await response.json();
    localStorage.setItem(TOKEN_KEY, accessToken);
  };

  const getUserFromStorage = useCallback((): UserLogin | null => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) return null;
    const decoded = jwtDecode<UserJwtPayload>(token);

    return {
      id: decoded.userId,
      username: decoded.username,
      token,
    };
  }, []);

  return {
    register,
    login,
    getUserFromStorage,
  };
};
