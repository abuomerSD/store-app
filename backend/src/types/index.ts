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
  id: string;
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
interface IUnit {
  unitType: string;
  unitName?: { en: string; ar: string } | null;
  conversionFactor: number;
  isDefault: boolean;
  addedBy?: Types.ObjectId | null;
  addedAt: Date;
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description?: string | null;
  code: string;
  category: Types.ObjectId;
  minStockQty: number;
  currentStock: number;
  createdBy: Types.ObjectId;
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
  _id: Types.ObjectId;
  product: Types.ObjectId;
  movementType: "IN" | "OUT" | "ADJUSTMENT";
  quantity: number;
  unitType: string;
  inputQuantity: number;
  inputUnit: string;
  reference?: string | null;
  notes?: string | null;
  date: Date;
  operationId?: Types.ObjectId | null;
  createdBy: Types.ObjectId;
  verifiedBy?: Types.ObjectId | null;
  verifiedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// operations

export interface IOperationChange {
  field: string;
  oldValue: any;
  newValue: any;
  dataType: "string" | "number" | "boolean" | "object" | "array" | "date";
}

export interface IOperationDescription {
  en: string;
  ar: string;
}

export interface IOperation {
  _id: Types.ObjectId;
  operationId: string;
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
  changes?: IOperationChange[] | null;
  user: Types.ObjectId;
  userIp: string;
  userAgent?: string | null;
  timestamp: Date;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
