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

const productService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
};

export default productService;
