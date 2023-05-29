import { UserController } from "../controllers/UserController";
import { Router } from "express";

const userRoute = Router();

userRoute.post("/user", new UserController().create);

export default userRoute;
