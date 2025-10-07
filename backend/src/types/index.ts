import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

// user
export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  role: "admin" | "user";
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReqUser extends JwtPayload {
  id: string | Types.ObjectId;
  username: string;
  role: "admin" | "user";
}

// category
export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdBy: Types.ObjectId;
}

// product
export interface IUnit {
  name: string;
  isBaseUnit: boolean;
  piecesInUnit: number;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string | null;
  code: string;
  category: Types.ObjectId;
  minStockQty: number;
  units: IUnit[];
  currentStock: number;
  createdBy: Types.ObjectId;
  isLowStock?: boolean;
}

// unit

export interface IUnitDefinition {
  _id?: Types.ObjectId;
  name: string;
  qtyPerUnit: number;
  createdBy: Types.ObjectId;
  isBaseUnit?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// stock movement

export interface IStockMovement {
  _id?: Types.ObjectId;
  product: Types.ObjectId;
  movementType: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  note?: string | null;
  operationId?: Types.ObjectId | null;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// operations

export interface IOperationDescription {
  en: string;
  ar: string;
}

export interface IOperation {
  _id?: Types.ObjectId;
  action:
    | "USER_LOGIN"
    | "USER_LOGOUT"
    | "USER_CREATE"
    | "USER_UPDATE"
    | "USER_DELETE"
    | "PRODUCT_CREATE"
    | "PRODUCT_UPDATE"
    | "PRODUCT_DELETE"
    | "CATEGORY_CREATE"
    | "CATEGORY_UPDATE"
    | "CATEGORY_DELETE"
    | "STOCK_IN"
    | "STOCK_OUT"
    | "STOCK_ADJUST"
    | "EXPORT_REPORT"
    | "BACKUP_SYSTEM";
  entity: "USER" | "PRODUCT" | "CATEGORY" | "STOCK_MOVEMENT" | "SYSTEM";
  entityId?: Types.ObjectId | null;
  description: IOperationDescription;
  user: Types.ObjectId | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
