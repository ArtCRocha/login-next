import { InputGroupProps } from "@/app/types/inputGroup";
import Label from "../label";
import { EyeStyles, InputGroupStyles } from "./styles";
import Input from "../input";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function InputGroup({
  label,
  type,
  name,
  formik,
}: InputGroupProps) {
  const [typeEye, setTypeEye] = useState<string>("password");

  function showPassword() {
    if (typeEye === "password") {
      setTypeEye("text");
    } else {
      setTypeEye("password");
    }
  }

  return (
    <InputGroupStyles>
      <Label>{label}</Label>
      <Input
        type={type === "password" ? typeEye : type}
        name={name}
        onChange={formik.handleChange}
      />
      {type === "password" && (
        <EyeStyles onClick={showPassword}>
          {typeEye === "password" ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}
        </EyeStyles>
      )}
    </InputGroupStyles>
  );
}
