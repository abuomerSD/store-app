import { required } from "joi";
import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qtyPerUnit: {
      type: Number,
      required: true,
    },
    isBaseUnit: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

// Indexes
// unitSchema.index({ unitType: 1 });
// unitSchema.index({ isActive: 1 });

export const UnitDefinitionModel = mongoose.model("UnitDefinition", unitSchema);
