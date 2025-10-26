import { Types } from "mongoose";
import unitDefinitionService from "../services/unitDefinition.service";
import { DEFAULT_PASSWORD, DEFAULT_USERNAME, MONGODB_URI } from "./env";
import { IUnitDefinition, IUser } from "../types";
import userService from "../services/user.service";

// db/connection.js
const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await addDefaults();

    // Create indexes
    // mongoose.connection.once("open", async () => {
    //   const models = [
    //     mongoose.model("User"),
    //     mongoose.model("Category"),
    //     mongoose.model("Product"),
    //     mongoose.model("StockMovement"),
    //     mongoose.model("Operation"),
    //     mongoose.model("UnitDefinition"),
    //   ];

    //   for (const model of models) {
    //     try {
    //       console.log(`Rebuilding indexes for ${model.modelName}...`);
    //       await model.syncIndexes(); // <- the correct method
    //       console.log(`Indexes for ${model.modelName} are in sync.`);
    //     } catch (err) {
    //       console.error(`Error syncing indexes for ${model.modelName}:`, err);
    //     }
    //   }
    // });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export const addDefaults = async () => {
  const users = await userService.findAll();
  if (users) {
    if (users.length < 1) {
      const user: IUser = {
        username: DEFAULT_USERNAME,
        password: DEFAULT_PASSWORD,
        role: "admin",
      };
      const saved = await userService.save(user);
      console.log("default user inserted", saved.username);
      addDefaultUnit(saved._id ? saved._id?.toString() : "");
    }
  }
};

const addDefaultUnit = async (defaultUserId: string) => {
  const units = await unitDefinitionService.findAll();
  if (units) {
    if (units?.length < 1) {
      const unit: IUnitDefinition = {
        name: "piece",
        createdBy: new Types.ObjectId(defaultUserId),
        qtyPerUnit: 1,
        isBaseUnit: true,
      };
      unit.name = "piece";
      const saved = await unitDefinitionService.save(unit);
      console.log("default unit inserted", saved.name);
    }
  }
};
