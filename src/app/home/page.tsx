"use client";

import { useEffect } from "react";
import useAuth from "../context/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { logout } = useAuth();
  const { push } = useRouter();

  let token: string | null = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      push("login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <p>Página Home</p>
      <button onClick={logout}>Sair</button>
    </>
  );
}
