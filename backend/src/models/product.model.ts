import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    sku: {
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
    baseUnit: {
      type: String,
      required: true,
      enum: ["piece", "kg", "gram", "liter", "ml", "meter", "cm"],
      default: "piece",
    },
    units: [
      {
        unitType: {
          type: String,
          required: true,
        },
        unitName: {
          en: {
            type: String,
            required: true,
          },
          ar: {
            type: String,
            required: true,
          },
        },
        conversionFactor: {
          type: Number,
          required: true,
          min: 0.001,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
    isActive: {
      type: Boolean,
      default: true,
    },
    auditTrail: [
      {
        operationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Operation",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        performedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ "name.en": "text", "name.ar": "text", sku: "text" });
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
