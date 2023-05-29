import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

interface EmptyFields {
  [key: string]: any;
}

export class UserController {
  async create(req: Request, res: Response) {
    const { name, last_name, email, password } = req.body;

    const userExist = await UserRepository.findOneBy({ email });

    if (userExist) {
      return res.status(400).json({ message: "Usuário já existente" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.create({
      name,
      last_name,
      email,
      password: hashPassword,
    });

    await UserRepository.save(newUser);

    const { password: _, ...user } = newUser;

    let userObj: EmptyFields = {
      ...user,
    };

    for (let key in userObj) {
      if (userObj[key] === "") {
        return res.status(400).json({ message: "Campos inválidos" });
      }

      return res.status(201).json(userObj);
    }
  }
}
