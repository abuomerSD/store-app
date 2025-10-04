import express from "express";
import categoryController from "../controllers/category.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";

export const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.findAll)
  .post(authMiddleware, roleAuthMiddleware(["admin"]), categoryController.save);

categoryRouter.route("/paginate").get(categoryController.paginate);
categoryRouter.route("/search").get(categoryController.search);

categoryRouter
  .route("/:id")
  .get(categoryController.findById)
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    categoryController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    categoryController.deleteById
  );
