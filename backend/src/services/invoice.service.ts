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
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = await InvoiceModel.countDocuments();
  return { invoices, total_rows };
};

const deleteById = async (id: Types.ObjectId) => {
  const deleted = await InvoiceModel.findOneAndDelete({ _id: id });
  return deleted;
};

const invoiceService = {
  save,
  paginate,
  deleteById,
};

export default invoiceService;
