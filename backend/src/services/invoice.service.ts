import { Types } from "mongoose";
import { InvoiceModel } from "../models/invoice.model";

const save = async (
  invoiceNumber: string,
  customerName: string,
  info: string,
  file: string | undefined,
  createdBy: Types.ObjectId
) => {
  const saved = await InvoiceModel.create({
    invoiceNumber,
    customerName,
    info,
    file,
    createdBy,
  });

  return saved;
};

const paginate = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const invoices = await InvoiceModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total_rows = await InvoiceModel.countDocuments();
  return { invoices, total_rows };
};

const invoiceService = {
  save,
  paginate,
};

export default invoiceService;
