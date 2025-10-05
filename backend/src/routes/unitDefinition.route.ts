import express from "express";
import unitController from "../controllers/unitDefinition.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";

export const unitDefinitionRouter = express.Router();

unitDefinitionRouter
  .route("/")
  .get(authMiddleware, roleAuthMiddleware(["admin"]), unitController.findAll)
  .post(authMiddleware, roleAuthMiddleware(["admin"]), unitController.save);

unitDefinitionRouter.route("/paginate").get(unitController.paginate);

unitDefinitionRouter
  .route("/:id")
  .get(authMiddleware, roleAuthMiddleware(["admin"]), unitController.findById)
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    unitController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    unitController.deleteById
  );
