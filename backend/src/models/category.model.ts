import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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
categorySchema.index({ "name.en": "text", "name.ar": "text" });
categorySchema.index({ isActive: 1 });
categorySchema.index({ createdAt: -1 });

export const CategoryModel = mongoose.model("Category", categorySchema);
