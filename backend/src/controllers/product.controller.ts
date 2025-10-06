import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import productService from "../services/product.service";
import { IProduct } from "../types";
import { FailResponse, SuccessResponse } from "../utils/responseTypes";
import { Types } from "mongoose";

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
  const user = req.user;
  if (user) {
    product.createdBy = new Types.ObjectId(user.id);
    const saved = await productService.save(product);
    res.status(201).json(new SuccessResponse({ product: saved }));
  } else {
    res.status(401).json(new FailResponse({ message: "no user logged in" }));
  }
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

const paginate = asyncHandler(async (req: Request, res: Response) => {
  const { pageStr, limitStr, categoryIdStr } = req.query;
  const page = Number(pageStr);
  const limit = Number(limitStr);
  const categoryId = categoryIdStr?.toString() || "";
  const { products, total_rows } = await productService.paginate(
    page,
    limit,
    categoryId
  );
  res.status(200).json(new SuccessResponse({ products, total_rows }));
});

const addUnit = asyncHandler(async (req: Request, res: Response) => {
  const { name, isBaseUnit, piecesInUnit } = req.body;
  const { id } = req.params;
  const saved = await productService.addUnit(
    id,
    name,
    isBaseUnit,
    piecesInUnit
  );
  res.status(201).json(new SuccessResponse({ product: saved }));
});

const search = asyncHandler(async (req: Request, res: Response) => {
  const { search, pageStr, limitStr, categoryId } = req.query;
  const page = Number(pageStr);
  const limit = Number(limitStr);

  if (search && page && limit) {
    const s = search.toString();
    const { products, total_rows } = await productService.search(
      s,
      page,
      limit,
      categoryId?.toString() || ""
    );
    res.status(200).json(new SuccessResponse({ products, total_rows }));
  } else {
    res.status(400).json(
      new FailResponse({
        message: "Please Provide search, pageStr, limitStr",
      })
    );
  }
});

const productController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
  addUnit,
  search,
};

export default productController;
