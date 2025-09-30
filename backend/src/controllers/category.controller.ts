import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import categoryService from "../services/category.service";
import { SuccessResponse } from "../utils/responseTypes";
import { ICategory } from "../types";

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
  const saved = await categoryService.save(category);
  res.status(201).json({ category: saved });
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category: ICategory = req.body;
  const updated = await categoryService.updateById(id, category);
  res.status(200).json({ category: updated });
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted: ICategory | null = await categoryService.deleteById(id);
  res.status(200).json({ category: deleted });
});

const categoryController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default categoryController;
