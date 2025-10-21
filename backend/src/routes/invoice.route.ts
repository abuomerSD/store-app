import express from "express";
import invoiceController from "../controllers/product.controller";
export const invoiceRouter = express.Router();

invoiceRouter
  .route("/")
  .get(invoiceController.findAll)
  .post(invoiceController.save);

invoiceRouter.route("/paginate").get(invoiceController.paginate);
invoiceRouter.route("/paginate-all").get(invoiceController.paginateAll);
invoiceRouter.route("/search").get(invoiceController.search);
invoiceRouter.route("/search-all").get(invoiceController.searchAll);
invoiceRouter.route("/add-unit/:id").post(invoiceController.addUnit);
invoiceRouter
  .route("/calculate-current-stock")
  .get(invoiceController.calculateCurrentStock);

invoiceRouter.route("/incoming-qty").post(invoiceController.addIncomingQty);
invoiceRouter.route("/outgoing-qty").post(invoiceController.addOutgoingQty);

invoiceRouter
  .route("/paginate-products-under-demand-limit")
  .get(invoiceController.paginateProductsUnderDemandLimit);

invoiceRouter
  .route("/update-unit-by-name/:productId")
  .put(invoiceController.updateUnitByName);

invoiceRouter
  .route("/:id")
  .get(invoiceController.findById)
  .put(invoiceController.updateById)
  .delete(invoiceController.deleteById);
