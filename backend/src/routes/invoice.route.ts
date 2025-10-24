import express, { Request } from "express";
import invoiceController from "../controllers/invoice.controller";
import multer from "multer";
import { authMiddleware, roleAuthMiddleware } from "../middlewares/auth";
import path from "path";
export const invoiceRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req: Request, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (fileExt === ".pdf" && mimeType === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter,
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
invoiceRouter.route("/get-invoice-file").get(invoiceController.getInvoiceFile);
invoiceRouter.route("/search").get(invoiceController.search);

invoiceRouter
  .route("/:id")
  .get(invoiceController.findById)
  .put(invoiceController.updateById)
  .delete(invoiceController.deleteById);
