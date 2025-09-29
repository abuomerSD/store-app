import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    unitType: {
      type: String,
      required: true,
      enum: ["piece", "weight", "volume", "length"],
      unique: true,
    },
    baseUnit: {
      type: String,
      required: true,
    },
    conversions: [
      {
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
        conversionToBase: {
          type: Number,
          required: true,
          min: 0.001,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
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
unitSchema.index({ unitType: 1 });
unitSchema.index({ isActive: 1 });

export const UnitDefinitionModel = mongoose.model("UnitDefinition", unitSchema);
