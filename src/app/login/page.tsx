"use client";
import Container from "@/components/container";
import Form from "@/components/form";
import FilledButton from "@/components/form/filledButton";
import Subtitle from "@/components/form/subtitle";
import Title from "@/components/form/title";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Login } from "../context/types";
import { useFormik } from "formik";
import { MessageProps } from "../types/message";
import useAuth from "../context/auth";
import MessageVerifyField from "@/components/form/messageVerifyField";
import Message from "@/components/form/message";
import InputGroup from "@/components/form/inputGroup";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageProps | null>();
  const { login } = useAuth();
  const { push } = useRouter();

  const initialValues: Login = {
    email: "",
    password: "",
  };

  let token: string | null = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      push("home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const validationSchema = Yup.object({
    email: Yup.string().required("Este campo é obrigatório"),
    password: Yup.string()
      .required("Este campo é obrigatório")
      .min(6, "Senha deve ter no mínimo 6 caractéres"),
  });

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      setLoading(true);

      login(values).then(
        () => {
          setLoading(false);
          push("/home");
        },
        (e) => {
          setLoading(false);
          setMessage({
            color: "red",
            children: e.response.data.message,
          });
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        }
      );
    },

    validationSchema,
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Title>Login</Title>
        <Subtitle margin="0 0 15px 0">Faça login para acessar o app</Subtitle>
        <InputGroup label="Email" type="email" name="email" formik={formik} />
        {formik.errors.email && (
          <MessageVerifyField>{formik.errors.email}</MessageVerifyField>
        )}
        <InputGroup
          label="Senha"
          type="password"
          name="password"
          formik={formik}
        />
        {formik.errors.password && (
          <MessageVerifyField>{formik.errors.password}</MessageVerifyField>
        )}
        <FilledButton type="submit" loading={loading}>
          Entrar
        </FilledButton>
        {message && <Message color={message.color}>{message.children}</Message>}
        <Subtitle margin="0 0 15px 0">
          Ainda não tem conta? <Link href="/register">Cadastre-se</Link>
        </Subtitle>
      </Form>
    </Container>
  );
}
