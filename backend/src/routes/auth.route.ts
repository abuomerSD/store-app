import express from "express";
import authController from "../controllers/auth.controller";
import { validateLogin } from "../middlewares/validations/authValidationMiddleware";

export const authRouter = express.Router();

authRouter.route("/login").post(validateLogin, authController.login);
authRouter.route("/logout").post(authController.logout);
authRouter.route("/verify-token").post(authController.verify);
