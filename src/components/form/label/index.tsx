import React, { ReactNode } from "react";
import { LabelStyle } from "./styles";

export default function Label({ children }: { children: ReactNode }) {
  return <LabelStyle>{children}</LabelStyle>;
}
