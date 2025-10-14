import express from "express";
import categoryController from "../controllers/category.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";
import { validateCategory } from "../middlewares/validations/categoryValidationMiddleware";

export const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.findAll)
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    validateCategory,
    categoryController.save
  );

categoryRouter.route("/paginate").get(categoryController.paginate);
categoryRouter.route("/search").get(categoryController.search);

categoryRouter
  .route("/:id")
  .get(categoryController.findById)
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    validateCategory,

    categoryController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    categoryController.deleteById
  );
