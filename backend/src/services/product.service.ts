import { Types } from "mongoose";
import { ProductModel } from "../models/product.model";
import { IProduct } from "../types";

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

const save = async (product: IProduct): Promise<IProduct> => {
  const saved = await ProductModel.create(product);
  return saved;
};

const updateById = async (
  id: string,
  product: IProduct
): Promise<IProduct | null> => {
  const updated = await ProductModel.findOneAndUpdate({ _id: id }, product);
  return updated;
};

const deleteById = async (id: string): Promise<IProduct | null> => {
  const deleted = await ProductModel.findOneAndDelete({ _id: id });
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
};

export default productService;
