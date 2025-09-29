import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const findAll = asyncHandler(async (req: Request, res: Response) => {});

const findById = asyncHandler(async (req: Request, res: Response) => {});

const save = asyncHandler(async (req: Request, res: Response) => {});

const updateById = asyncHandler(async (req: Request, res: Response) => {});

const deleteById = asyncHandler(async (req: Request, res: Response) => {});

const productController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default productController;
