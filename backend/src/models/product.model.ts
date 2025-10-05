import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    // autoIndex: true,
  }
);

// Indexes
productSchema.index({ name: "text", sku: "text" });
productSchema.index({ category: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ currentStock: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for low stock alert
productSchema.virtual("isLowStock").get(function () {
  return this.currentStock <= this.minStockQty;
});

export const ProductModel = mongoose.model("Product", productSchema);
