import mongoose from "mongoose";

const operationSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "USER_LOGIN",
        "USER_LOGOUT",
        "USER_CREATE",
        "USER_UPDATE",
        "USER_DELETE",
        "PRODUCT_CREATE",
        "PRODUCT_UPDATE",
        "PRODUCT_DELETE",
        "CATEGORY_CREATE",
        "CATEGORY_UPDATE",
        "CATEGORY_DELETE",
        "STOCK_IN",
        "STOCK_OUT",
        "STOCK_ADJUST",
        "STOCK_TRANSFER",
        "EXPORT_REPORT",
        "BACKUP_SYSTEM",
      ],
    },
    entity: {
      type: String,
      required: true,
      enum: ["USER", "PRODUCT", "CATEGORY", "STOCK_MOVEMENT", "SYSTEM"],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entity",
    },
    description: {
      en: {
        type: String,
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

// Indexes for performance
// operationSchema.index({ timestamp: -1 });
// operationSchema.index({ user: 1, timestamp: -1 });
// operationSchema.index({ entity: 1, entityId: 1 });
// operationSchema.index({ action: 1, timestamp: -1 });
// operationSchema.index({ "description.en": "text", "description.ar": "text" });

// Static method to generate operation ID
operationSchema.statics.generateOperationId = function () {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `OP-${timestamp}-${random}`;
};

export const OperationModel = mongoose.model("Operation", operationSchema);
