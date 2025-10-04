import { Request, Response } from "express";
import { ICategory } from "../types";
import { CategoryModel } from "../models/category.model";
import { ObjectId } from "mongoose";

const findAll = async (): Promise<ICategory[]> => {
  const categories = await CategoryModel.find();
  return categories;
};

const findById = async (id: string): Promise<ICategory | null> => {
  const category = await CategoryModel.findById(id);
  if (category) {
    return category;
  }
  return null;
};

const save = async (category: ICategory): Promise<ICategory> => {
  const saved = await CategoryModel.create(category);
  return saved;
};

const updateById = async (
  id: string,
  category: ICategory
): Promise<ICategory | null> => {
  const updated = await CategoryModel.findOneAndUpdate({ _id: id }, category);
  return updated;
};

const deleteById = async (id: string): Promise<ICategory | null> => {
  const deleted = await CategoryModel.findOneAndDelete({ _id: id });
  return deleted;
};

const paginate = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find()
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = (await CategoryModel.find()).length;
  return {
    total_rows,
    categories,
  };
};

const search = async (search: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({
    name: { $regex: search, $options: "i" },
  })
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total_rows = (
    await CategoryModel.find({
      name: { $regex: search, $options: "i" },
    })
  ).length;
  return {
    total_rows,
    categories,
  };
};

const categoryService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
  search,
};

export default categoryService;
