import express from "express";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";
import dashboardController from "../controllers/dashboard.controller";

export const dashboardRouter = express.Router();

dashboardRouter
  .route("/get-counts")
  .get(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    dashboardController.getCounts
  );
