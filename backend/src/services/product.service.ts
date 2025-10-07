import { ObjectId, Types } from "mongoose";
import { ProductModel } from "../models/product.model";
import { IOperation, IProduct, IStockMovement } from "../types";
import { OperationModel } from "../models/operation.model";
import { StockMovementModel } from "../models/stockMovement.model";
import { SuccessResponse } from "../utils/responseTypes";

const findAll = async (): Promise<IProduct[] | null> => {
  const products: IProduct[] = await ProductModel.find();
  if (products) {
    return products;
  }
  return null;
};

const findById = async (id: string): Promise<IProduct | null> => {
  const product: IProduct | null = await ProductModel.findById(id);
  return product;
};

const save = async (
  product: IProduct,
  userId: Types.ObjectId
): Promise<IProduct> => {
  const saved = await ProductModel.create(product);
  if (saved) {
    const operation: IOperation = {
      action: "PRODUCT_CREATE",
      entity: "PRODUCT",
      entityId: saved._id,
      description: {
        en: "Product Created",
        ar: "حفظ منتج",
      },
      user: userId,
    };
    await OperationModel.create(operation);
  }
  return saved;
};

const updateById = async (
  id: string,
  product: IProduct,
  userId: Types.ObjectId
): Promise<IProduct | null> => {
  const updated = await ProductModel.findOneAndUpdate({ _id: id }, product);
  if (updated) {
    const operation: IOperation = {
      action: "PRODUCT_UPDATE",
      entity: "PRODUCT",
      entityId: updated._id,
      description: {
        en: "Product Updated",
        ar: "تحديث منتج",
      },
      user: userId,
    };
    await OperationModel.create(operation);
  }
  return updated;
};

const deleteById = async (
  id: string,
  userId: Types.ObjectId
): Promise<IProduct | null> => {
  const deleted = await ProductModel.findOneAndDelete({ _id: id });
  if (deleted) {
    const operation: IOperation = {
      action: "PRODUCT_DELETE",
      entity: "PRODUCT",
      entityId: deleted._id,
      description: {
        en: "Product Deleted",
        ar: "حذف منتج",
      },
      user: userId,
    };
    await OperationModel.create(operation);
  }
  return deleted;
};

const paginate = async (page: number, limit: number, categoryId: string) => {
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({ category: categoryId })
    .populate("createdBy", "username")
    .populate("category", "name")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = (await ProductModel.find()).length;
  return {
    total_rows,
    products,
  };
};

const paginateAll = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const products = await ProductModel.find()
    .populate("createdBy", "username")
    .populate("category", "name")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = (await ProductModel.find()).length;
  return {
    total_rows,
    products,
  };
};

const addUnit = async (
  productId: string,
  name: string,
  isBaseUnit: boolean,
  piecesInUnit: number
) => {
  const product = await ProductModel.updateOne(
    { _id: productId },
    { $push: { units: { name, isBaseUnit, piecesInUnit } } }
  );
  return product;
};

const search = async (
  search: string,
  page: number,
  limit: number,
  categoryId: string
) => {
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({
    name: { $regex: search, $options: "i" },
    category: categoryId,
  })
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total_rows = (
    await ProductModel.find({
      name: { $regex: search, $options: "i" },
    })
  ).length;
  return {
    total_rows,
    products,
  };
};

const searchAll = async (search: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({
    name: { $regex: search, $options: "i" },
  })
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total_rows = (
    await ProductModel.find({
      name: { $regex: search, $options: "i" },
    })
  ).length;
  return {
    total_rows,
    products,
  };
};

const calculateCurrentStock = async (productId: string, unitName: string) => {
  const product = await ProductModel.findOne({ _id: productId });
  let newCurrentQty = 0;
  if (product) {
    const selectedUnit = product.units.find((unit) => unit.name === unitName);
    console.log("selectedUnit", selectedUnit);
    if (selectedUnit) {
      newCurrentQty = Math.floor(
        product.currentStock / selectedUnit.piecesInUnit
      );
      console.log("newCurrentQty", newCurrentQty);
      return newCurrentQty;
    } else {
      throw new Error("No units found to this product");
    }
  } else {
    throw new Error("No Product Found");
  }
};

const addIncomingQty = async (
  productId: Types.ObjectId,
  qty: number,
  note: string,
  userId: Types.ObjectId,
  selectedUnit: string
) => {
  // validation qty
  if (qty <= 0) {
    throw new Error("quantity must be positive number");
  }

  const product = await ProductModel.findById(productId);
  const unit = product?.units.find((u) => u.name === selectedUnit);
  const unitsFactor = unit?.piecesInUnit ? unit?.piecesInUnit : 1;

  const currentStock = product?.currentStock || 0;
  const updated = await ProductModel.findOneAndUpdate(
    { _id: productId },
    { currentStock: qty * unitsFactor + currentStock }
  );

  // operation
  const operation: IOperation = {
    action: "STOCK_IN",
    entity: "PRODUCT",
    entityId: productId,
    description: {
      en: "Incomming Quantity",
      ar: "كمية واردة",
    },
    user: userId,
  };

  const savedOperation = await OperationModel.create(operation);

  // stock Movement
  const stockMovement: IStockMovement = {
    product: productId,
    movementType: "IN",
    quantity: qty,
    note,
    createdBy: userId,
    operationId: savedOperation._id,
  };

  const savedStockMovement = await StockMovementModel.create(stockMovement);

  return updated;
};

const addOutgoingQty = async (
  productId: Types.ObjectId,
  qty: number,
  note: string,
  userId: Types.ObjectId,
  selectedUnit: string
) => {
  // validation qty
  if (qty <= 0) {
    throw new Error("quantity must be positive number");
  }

  const product = await ProductModel.findById(productId);
  const unit = product?.units.find((u) => u.name === selectedUnit);
  const unitsFactor = unit?.piecesInUnit ? unit?.piecesInUnit : 1;

  const currentStock = product?.currentStock || 0;
  const newCurrentStock = currentStock - qty * unitsFactor;
  if (newCurrentStock < 0) {
    throw new Error("Wrong Quantity");
  }
  const updated = await ProductModel.findOneAndUpdate(
    { _id: productId },
    { currentStock: newCurrentStock }
  );

  // operation
  const operation: IOperation = {
    action: "STOCK_OUT",
    entity: "PRODUCT",
    entityId: productId,
    description: {
      en: "Outgoing Quantity",
      ar: "كمية منصرفة",
    },
    user: userId,
  };

  const savedOperation = await OperationModel.create(operation);

  // stock Movement
  const stockMovement: IStockMovement = {
    product: productId,
    movementType: "OUT",
    quantity: qty,
    note,
    createdBy: userId,
    operationId: savedOperation._id,
  };

  const savedStockMovement = await StockMovementModel.create(stockMovement);

  return updated;
};

const productService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
  paginateAll,
  addUnit,
  search,
  searchAll,
  calculateCurrentStock,
  addIncomingQty,
  addOutgoingQty,
};

export default productService;
