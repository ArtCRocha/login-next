import { ReactNode } from "react";
import { MessageVerifyFieldStyle } from "./styles";

export default function MessageVerifyField({
  children,
}: {
  children: ReactNode;
}) {
  return <MessageVerifyFieldStyle>{children}</MessageVerifyFieldStyle>;
}
