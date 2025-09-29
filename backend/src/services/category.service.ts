import { Request, Response } from "express";
import { ICategory } from "../types";
import { CategoryModel } from "../models/category.model";

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

const categoryService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default categoryService;
