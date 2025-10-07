import { Request, Response } from "express";
import { ICategory, IOperation, IReqUser, IUser } from "../types";
import { CategoryModel } from "../models/category.model";
import { ObjectId, Types } from "mongoose";
import { OperationModel } from "../models/operation.model";

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
  const operation: IOperation = {
    action: "CATEGORY_CREATE",
    entity: "CATEGORY",
    entityId: saved._id,
    description: {
      en: "Category Created",
      ar: "اضافة تصنيف",
    },
    user: category.createdBy,
  };
  await OperationModel.create(operation);
  return saved;
};

const updateById = async (
  id: string,
  category: ICategory,
  userId: Types.ObjectId
): Promise<ICategory | null> => {
  const updated = await CategoryModel.findOneAndUpdate({ _id: id }, category);
  if (updated) {
    const operation: IOperation = {
      action: "CATEGORY_UPDATE",
      entity: "CATEGORY",
      entityId: updated._id,
      description: {
        en: "Category Updated",
        ar: "تعديل تصنيف",
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
): Promise<ICategory | null> => {
  const deleted = await CategoryModel.findOneAndDelete({ _id: id });
  if (deleted) {
    const operation: IOperation = {
      action: "CATEGORY_DELETE",
      entity: "CATEGORY",
      entityId: deleted._id,
      description: {
        en: "Category Deleted",
        ar: "حذف تصنيف",
      },
      user: userId,
    };
    await OperationModel.create(operation);
  }
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
