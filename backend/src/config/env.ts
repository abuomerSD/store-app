import dotenv from "dotenv";

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_SECRET: string = process.env.JWT_SECRET || "";
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME
  ? process.env.DEFAULT_USERNAME
  : "";
export const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD
  ? process.env.DEFAULT_PASSWORD
  : "";
