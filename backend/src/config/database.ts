import { MONGODB_URI } from "./env";

// db/connection.js
const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create indexes in background for performance
    mongoose.connection.on("connected", async () => {
      await mongoose.model("User").createIndexes();
      await mongoose.model("Category").createIndexes();
      await mongoose.model("Product").createIndexes();
      await mongoose.model("StockMovement").createIndexes();
      await mongoose.model("Operation").createIndexes();
      await mongoose.model("UnitDefinition").createIndexes();
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
