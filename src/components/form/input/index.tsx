import React, { ChangeEventHandler } from "react";
import { InputStyle } from "./styles";

interface InputProps {
  type: string | undefined;
  name: string;
  onChange: ChangeEventHandler<any> | undefined;
}

export default function Input({ type, name, onChange }: InputProps) {
  return <InputStyle name={name} type={type} onChange={onChange} />;
}
