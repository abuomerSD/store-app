import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import productService from "../services/product.service";
import { IProduct } from "../types";
import { SuccessResponse } from "../utils/responseTypes";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.findAll();
  res.status(200).json(new SuccessResponse({ products }));
});

const findById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  res.status(200).json(new SuccessResponse({ product }));
});

const save = asyncHandler(async (req: Request, res: Response) => {
  const product: IProduct = req.body;
  const saved = await productService.save(product);
  res.status(201).json(new SuccessResponse({ product: saved }));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product: IProduct = req.body;
  const updated = await productService.updateById(id, product);
  res.status(200).json(new SuccessResponse({ product: updated }));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await productService.deleteById(id);
  res.status(200).json(new SuccessResponse({ product: deleted }));
});

const productController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default productController;
