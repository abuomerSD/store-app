import { Types } from "mongoose";
import { InvoiceModel } from "../models/invoice.model";
import fs from "fs";

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
  const invoices = await InvoiceModel.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  const total_rows = await InvoiceModel.countDocuments();
  return { invoices, total_rows };
};

const deleteById = async (id: Types.ObjectId) => {
  const deleted = await InvoiceModel.findOneAndDelete({ _id: id });

  const filePath = deleted?.file;

  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting file: ${err.message}`);
      else console.log(`File deleted: ${filePath}`);
    });
  }

  return deleted;
};

const search = async (page: number, limit: number, search: string) => {
  const skip = (page - 1) * limit;
  const invoices = await InvoiceModel.find({
    invoiceNumber: { $regex: search, $options: "i" },
  })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = await InvoiceModel.countDocuments({
    invoiceNumber: { $regex: search, $options: "i" },
  });
  return { invoices, total_rows };
};

const invoiceService = {
  save,
  paginate,
  deleteById,
  search,
};

export default invoiceService;
