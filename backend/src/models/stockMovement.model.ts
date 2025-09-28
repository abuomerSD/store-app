import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    movementType: {
      type: String,
      required: true,
      enum: ["IN", "OUT", "ADJUSTMENT", "TRANSFER"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.001,
    },
    unitType: {
      type: String,
      required: true,
    },
    inputQuantity: {
      type: Number,
      required: true,
      min: 0.001,
    },
    inputUnit: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    operationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operation",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
stockMovementSchema.index({ product: 1, date: -1 });
stockMovementSchema.index({ movementType: 1 });
stockMovementSchema.index({ date: -1 });
stockMovementSchema.index({ createdBy: 1 });
stockMovementSchema.index({ reference: 1 });

export const StockMovementModel = mongoose.model(
  "StockMovement",
  stockMovementSchema
);
