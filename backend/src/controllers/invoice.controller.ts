import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { FailResponse, SuccessResponse } from "../utils/responseTypes";
import { Types } from "mongoose";
import invoiceService from "../services/invoice.service";

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

const deleteById = asyncHandler(async (req: Request, res: Response) => {});

// paginate invoices in one category
const paginate = asyncHandler(async (req: Request, res: Response) => {});

const search = asyncHandler(async (req: Request, res: Response) => {});

const invoiceController = {
  findById,
  save,
  updateById,
  deleteById,
  paginate,
  search,
};

export default invoiceController;
