import express from "express";
import stockMovementController from "../controllers/stockMovement.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";

export const stockMovementRouter = express.Router();

stockMovementRouter
  .route("/")
  .get(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    stockMovementController.findAll
  )
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    stockMovementController.save
  );

stockMovementRouter
  .route("/:id")
  .get(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    stockMovementController.findById
  )
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    stockMovementController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    stockMovementController.deleteById
  );
