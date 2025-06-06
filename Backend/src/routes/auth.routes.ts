import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();
const authController = container.resolve(AuthController);

authRoutes
  .post("/login", authController.login)
  .post("/logout", authController.logout);

export default authRoutes;
