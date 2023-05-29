"use client";
import Container from "@/components/container";
import Form from "@/components/form";
import FilledButton from "@/components/form/filledButton";
import Subtitle from "@/components/form/subtitle";
import Title from "@/components/form/title";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import useAuth from "../context/auth";
import Message from "@/components/form/message";
import { MessageProps } from "../types/message";
import { User } from "../types/user";
import * as Yup from "yup";
import MessageVerifyField from "@/components/form/messageVerifyField";
import InputGroup from "@/components/form/inputGroup";
import { useRouter } from "next/navigation";

type UserWithoutId = Omit<User, "id">;

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageProps | null>();

  const initialValues: UserWithoutId = {
    name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const { register } = useAuth();
  const { push } = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().required("Este campo é obrigatório"),
    last_name: Yup.string().required("Este campo é obrigatório"),
    email: Yup.string().required("Este campo é obrigatório"),
    password: Yup.string()
      .required("Este campo é obrigatório")
      .min(6, "Senha deve ter no mínimo 6 caractéres"),
  });

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      setLoading(true);

      register(values).then(
        () => {
          setLoading(false);
          setMessage({
            color: "green",
            children: "Usuário criado com sucesso",
          });
          setTimeout(() => {
            setMessage(null);
            push("/login");
          }, 1200);
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
        <Title>Cadastre-se</Title>
        <InputGroup label="Nome" type="text" name="name" formik={formik} />
        {formik.errors.name && (
          <MessageVerifyField>{formik.errors.name}</MessageVerifyField>
        )}
        <InputGroup
          label="Sobrenome"
          type="text"
          name="last_name"
          formik={formik}
        />
        {formik.errors.last_name && (
          <MessageVerifyField>{formik.errors.last_name}</MessageVerifyField>
        )}
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
        <FilledButton loading={loading}>Cadastre-se</FilledButton>
        {message && <Message color={message.color}>{message.children}</Message>}
        <Subtitle margin="0 0 15px 0">
          Ja tem conta? <Link href="/login">Login</Link>
        </Subtitle>
      </Form>
    </Container>
  );
}
