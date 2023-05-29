import { ReactNode } from "react";
import { User } from "../types/user";

export interface Login {
  email: string;
  password: string;
}

export type Register = Login & {
  name: string;
  last_name: string;
};

export interface Context {
  children: ReactNode;
}

export interface Token {
  token: string;
}

export interface ContextProps {
  user: User | undefined;
  isLoading: boolean;
  register: (formData: Register) => Promise<void>;
  login: (formData: Login) => Promise<void>;
  logout: () => void;
}
