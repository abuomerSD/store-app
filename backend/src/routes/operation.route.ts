import express from "express";
import operationController from "../controllers/operation.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";

export const operationRouter = express.Router();

operationRouter
  .route("/")
  .get(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    operationController.findAll
  )
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    operationController.save
  );

operationRouter
  .route("/:id")
  .get(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    operationController.findById
  )
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    operationController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    operationController.deleteById
  );
