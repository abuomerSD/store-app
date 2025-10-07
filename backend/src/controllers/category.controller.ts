import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import categoryService from "../services/category.service";
import { FailResponse, SuccessResponse } from "../utils/responseTypes";
import { ICategory } from "../types";
import { ObjectId, Types } from "mongoose";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const categories: ICategory[] = await categoryService.findAll();
  res.status(200).json(new SuccessResponse({ categories }));
});

const findById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoryService.findById(id);
  res.status(200).json(new SuccessResponse({ category }));
});

const save = asyncHandler(async (req: Request, res: Response) => {
  const category: ICategory = req.body;
  const user = req.user;
  if (user) {
    category.createdBy = new Types.ObjectId(user?.id);
    const saved = await categoryService.save(category);
    res.status(201).json(new SuccessResponse({ category: saved }));
  } else {
    res.status(400).json(new FailResponse({ message: "no user logged in" }));
  }
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category: ICategory = req.body;
  const user = req.user;
  const userId = user?.id;
  const updated = await categoryService.updateById(
    id,
    category,
    new Types.ObjectId(userId)
  );
  res.status(200).json(new SuccessResponse({ category: updated }));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const userId = new Types.ObjectId(user?.id);
  const deleted: ICategory | null = await categoryService.deleteById(
    id,
    userId
  );
  res.status(200).json(new SuccessResponse({ category: deleted }));
});

const paginate = asyncHandler(async (req: Request, res: Response) => {
  const { pageStr, limitStr } = req.query;
  const page = Number(pageStr);
  const limit = Number(limitStr);
  const { categories, total_rows } = await categoryService.paginate(
    page,
    limit
  );
  res.status(200).json(new SuccessResponse({ categories, total_rows }));
});

const search = asyncHandler(async (req: Request, res: Response) => {
  const { search, pageStr, limitStr } = req.query;
  const page = Number(pageStr);
  const limit = Number(limitStr);

  if (search && page && limit) {
    const s = search.toString();
    const { categories, total_rows } = await categoryService.search(
      s,
      page,
      limit
    );
    res.status(200).json(new SuccessResponse({ categories, total_rows }));
  } else {
    res.status(400).json(
      new FailResponse({
        message: "Please Provide search, pageStr, limitStr",
      })
    );
  }
});

const categoryController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
  search,
};

export default categoryController;
