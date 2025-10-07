import mongoose, { Types, Schema, Document } from "mongoose";
import { IProduct, IUnit } from "../types";

const unitSchema = new Schema<IUnit>(
  {
    name: { type: String, required: true, trim: true },
    isBaseUnit: { type: Boolean, default: false },
    piecesInUnit: { type: Number, required: true, min: 1 },
  },
  { _id: false } // prevents creating separate _id for each subdocument
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    units: {
      type: [unitSchema],
      default: [],
    },
    minStockQty: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//  Corrected indexes (removed invalid ones)
productSchema.index({ name: "text", code: "text" });
productSchema.index({ category: 1 });
productSchema.index({ currentStock: 1 });
productSchema.index({ createdAt: -1 });

//  Virtual for low stock
productSchema.virtual("isLowStock").get(function (this: IProduct) {
  return this.currentStock <= this.minStockQty;
});

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);
