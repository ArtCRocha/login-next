import { LoginController } from "../controllers/LoginController";
import { Router } from "express";
import { authMiddleware } from "../middlewres/authMiddlewares";

const loginRoute = Router();

loginRoute.post("/login", new LoginController().login);
loginRoute.use(authMiddleware);
loginRoute.get("/profile", new LoginController().getUser);

export default loginRoute;
