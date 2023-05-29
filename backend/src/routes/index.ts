import express from "express";
import userRoute from "./users";
import loginRoute from "./login";
import cors from "cors";

type Express = any;

export default function routes(app: Express) {
  app.use(express.json(), cors(), userRoute, loginRoute);
}
