import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { FailResponse, SuccessResponse } from "../utils/responseTypes";
import { Types } from "mongoose";
import invoiceService from "../services/invoice.service";
import fs from "fs";

const findById = asyncHandler(async (req: Request, res: Response) => {});

const save = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.file);
  const { invoiceNumber, customerName, info } = req.body;
  const file = req.file?.path;
  const user = req.user;
  if (req.file && user) {
    const createdBy = new Types.ObjectId(user.id);
    const saved = invoiceService.save(
      invoiceNumber,
      customerName,
      info,
      file,
      createdBy
    );
    res.status(201).json(new SuccessResponse({ data: saved }));
  } else {
    throw new Error("file not saved");
  }
});

const updateById = asyncHandler(async (req: Request, res: Response) => {});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Nod id found");
  }
  const deleted = await invoiceService.deleteById(new Types.ObjectId(id));
  res.status(200).json(new SuccessResponse({ invoice: deleted }));
});

// paginate invoices in one category
const paginate = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { invoices, total_rows } = await invoiceService.paginate(page, limit);

  res.status(200).json(new SuccessResponse({ invoices, total_rows }));
});

const search = asyncHandler(async (req: Request, res: Response) => {});

const getInvoiceFile = asyncHandler(async (req: Request, res: Response) => {
  const filePath = req.query.filePath as string;
  if (!filePath) {
    throw new Error("No File Found for this invoice");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=" + "Invoice");

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

const invoiceController = {
  findById,
  save,
  updateById,
  deleteById,
  paginate,
  search,
  getInvoiceFile,
};

export default invoiceController;
