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

const invoiceService = {
  save,
};

export default invoiceService;
