import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
}

export interface IReqUser extends JwtPayload {
  id: string;
  username: string;
  role: "admin" | "user";
}

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdBy: Types.ObjectId;
}

interface IUnit {
  unitType: string;
  unitName?: { en: string; ar: string } | null;
  conversionFactor: number;
  isDefault: boolean;
  addedBy?: Types.ObjectId | null;
  addedAt: Date;
}

interface IAuditTrail {
  operationId?: Types.ObjectId | null;
  timestamp: Date;
  performedBy?: Types.ObjectId | null;
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description?: string | null;
  sku: string;
  category: Types.ObjectId;
  baseUnit: string;
  units: IUnit[];
  minStockQty: number;
  currentStock: number;
  isActive: boolean;
  auditTrail: IAuditTrail[];
  createdBy: Types.ObjectId;
}
