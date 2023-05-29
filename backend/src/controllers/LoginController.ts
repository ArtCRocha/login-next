import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ id: user.id }, process.env.HASH_JWT ?? "", {
      expiresIn: "4h",
    });

    const { password: _, ...userLogin } = user;

    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async getUser(req: Request, res: Response) {
    return res.json(req.user);
  }
}
