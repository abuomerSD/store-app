import express, { Request } from "express";
import invoiceController from "../controllers/invoice.controller";
import multer from "multer";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";
export const invoiceRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req: Request, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

invoiceRouter
  .route("/")
  .post(
    authMiddleware,
    roleAuthMiddleware(["admin", "user"]),
    upload.single("file"),
    invoiceController.save
  );

invoiceRouter.route("/paginate").get(invoiceController.paginate);
invoiceRouter.route("/search").get(invoiceController.search);

invoiceRouter
  .route("/:id")
  .get(invoiceController.findById)
  .put(invoiceController.updateById)
  .delete(invoiceController.deleteById);
