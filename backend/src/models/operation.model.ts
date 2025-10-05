import mongoose from "mongoose";

const operationSchema = new mongoose.Schema(
  {
    operationId: {
      type: String,
      required: true,
      unique: true,
    },
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
    changes: [
      {
        field: {
          type: String,
          required: true,
        },
        oldValue: mongoose.Schema.Types.Mixed,
        newValue: mongoose.Schema.Types.Mixed,
        dataType: {
          type: String,
          enum: ["string", "number", "boolean", "object", "array", "date"],
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userIp: {
      type: String,
      required: true,
    },
    userAgent: String,
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
    // autoIndex: false,
  }
);

// Indexes for performance
operationSchema.index({ timestamp: -1 });
operationSchema.index({ user: 1, timestamp: -1 });
operationSchema.index({ entity: 1, entityId: 1 });
operationSchema.index({ action: 1, timestamp: -1 });
operationSchema.index({ "description.en": "text", "description.ar": "text" });

// Static method to generate operation ID
operationSchema.statics.generateOperationId = function () {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `OP-${timestamp}-${random}`;
};

export const OperationModel = mongoose.model("Operation", operationSchema);
