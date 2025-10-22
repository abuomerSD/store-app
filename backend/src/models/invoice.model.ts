import mongoose, { Types, Schema, Document } from "mongoose";
import { Iinvoice } from "../types";

const invoiceSchema = new Schema<Iinvoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customerName: {
      type: String,
      trim: true,
    },
    info: {
      type: String,
      required: true,
      trim: true,
    },
    file: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

export const InvoiceModel = mongoose.model<Iinvoice>("Invoice", invoiceSchema);
