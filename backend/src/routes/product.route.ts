import express from "express";
import productController from "../controllers/product.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";

export const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.findAll)
  .post(authMiddleware, roleAuthMiddleware(["admin"]), productController.save);

productRouter.route("/paginate").get(productController.paginate);
productRouter.route("/paginate-all").get(productController.paginateAll);
productRouter.route("/search").get(productController.search);
productRouter.route("/search-all").get(productController.searchAll);
productRouter.route("/add-unit/:id").post(productController.addUnit);
productRouter
  .route("/calculate-current-stock")
  .get(productController.calculateCurrentStock);

productRouter.route("/incoming-qty").post(productController.addIncomingQty);
productRouter.route("/outgoing-qty").post(productController.addOutgoingQty);

productRouter
  .route("/:id")
  .get(productController.findById)
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    productController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    productController.deleteById
  );
