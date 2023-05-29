import { ReactNode } from "react";
import { TitleStyle } from "./styles";

export default function Title({ children }: { children: ReactNode }) {
  return <TitleStyle>{children}</TitleStyle>;
}
