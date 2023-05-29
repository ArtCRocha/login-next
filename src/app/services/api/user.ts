import { User } from "../../types/user";
import http from "./http";

export async function getUser() {
  const { data } = await http.get<User>("profile");
  return data;
}
