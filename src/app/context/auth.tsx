"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { Context, ContextProps, Login, Register, Token } from "./types";
import http from "../services/api/http";
import { useQueryClient } from "react-query";
import { User } from "../types/user";
import { AxiosResponse } from "axios";

type UserWithoutPass = Omit<User, "password">;

const authContext = createContext({} as ContextProps);

export function AuthProvider({ children }: Context) {
  const [token, setToken] = useState<string | null>();
  const [user, steUser] = useState<AxiosResponse | any>();

  const client = useQueryClient();

  useEffect(() => {
    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      http.get<UserWithoutPass>("profile").then((res) => {
        steUser(res);
      });
    }
  }, [token]);

  async function login(formData: Login) {
    const { data } = await http.post<Token>("login", formData);
    setToken(data.token);

    localStorage.setItem("token", data.token);
  }

  async function register(formData: Register) {
    const { data } = await http.post("user", formData);
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    client.setQueryData(["profile"], null);
  }

  return (
    <authContext.Provider
      value={{
        user: user && user.data,
        isLoading: user && user.isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default function useAuth() {
  return useContext(authContext);
}
