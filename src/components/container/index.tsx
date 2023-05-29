import { ReactNode } from "react";
import { ContainerStyle } from "./styles";

export default function Container({ children }: { children: ReactNode }) {
  return <ContainerStyle>{children}</ContainerStyle>;
}
