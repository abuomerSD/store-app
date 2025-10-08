import express from "express";
import productController from "../controllers/product.controller";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";
import { validateProduct } from "../middlewares/validations/productValidationMiddleware";
import { validateProductMovement } from "../middlewares/validations/productMovementValidationMiddleware";
import { validateUnit } from "../middlewares/validations/unitValidationMiddleware";

export const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.findAll)
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin"]),
    validateProduct,
    productController.save
  );

productRouter.route("/paginate").get(productController.paginate);
productRouter.route("/paginate-all").get(productController.paginateAll);
productRouter.route("/search").get(productController.search);
productRouter.route("/search-all").get(productController.searchAll);
productRouter.route("/add-unit/:id").post(productController.addUnit);
productRouter
  .route("/calculate-current-stock")
  .get(productController.calculateCurrentStock);

productRouter
  .route("/incoming-qty")
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    validateProductMovement,
    productController.addIncomingQty
  );
productRouter
  .route("/outgoing-qty")
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    validateProductMovement,
    productController.addOutgoingQty
  );

productRouter
  .route("/paginate-products-under-demand-limit")
  .get(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    productController.paginateProductsUnderDemandLimit
  );

productRouter
  .route("/update-unit-by-name")
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    validateUnit,
    productController.updateUnitByName
  );

productRouter
  .route("/:id")
  .get(productController.findById)
  .put(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    validateProduct,
    productController.updateById
  )
  .delete(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    productController.deleteById
  );
