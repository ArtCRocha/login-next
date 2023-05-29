import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.HASH_JWT ?? "") as JwtPayload;

  const user = await UserRepository.findOneBy({ id });

  if (!user) {
    throw new Error("Não autorizado");
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};
