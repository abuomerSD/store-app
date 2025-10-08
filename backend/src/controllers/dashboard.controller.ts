import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { SuccessResponse } from "../utils/responseTypes";
import { CategoryModel } from "../models/category.model";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";

const getCounts = asyncHandler(async (req: Request, res: Response) => {
  console.log("get counts req");
  const categoriesCount = (await CategoryModel.countDocuments({})) || 0;
  const productsCount = (await ProductModel.countDocuments()) || 0;
  const usersCount = (await UserModel.countDocuments()) || 0;

  res
    .status(200)
    .json(new SuccessResponse({ categoriesCount, productsCount, usersCount }));
});

const dashboardController = {
  getCounts,
};

export default dashboardController;
