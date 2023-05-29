import React, { FormEvent, ReactNode } from "react";
import { FormStyle } from "./styles";

type FormProps = {
  children?: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Form({ children, onSubmit }: FormProps) {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
}
