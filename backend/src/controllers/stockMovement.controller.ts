import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import stockMovementService from "../services/stockMovement.service";
import { SuccessResponse } from "../utils/responseTypes";
import { IStockMovement } from "../types";
import { Types } from "mongoose";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const movements = await stockMovementService.findAll();
  res.status(200).json(new SuccessResponse({ movements }));
});

const findById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const movement = await stockMovementService.findById(id);
  res.status(200).json({ movement });
});

const save = asyncHandler(async (req: Request, res: Response) => {
  const movement: IStockMovement = req.body;
  const saved = await stockMovementService.save(movement);
  res.status(201).json(new SuccessResponse({ movement: saved }));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const movement: IStockMovement = req.body;
  const updated = await stockMovementService.updateById(id, movement);
  res.status(200).json(new SuccessResponse({ movement: updated }));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await stockMovementService.deleteById(id);
  res.status(200).json(new SuccessResponse({ movement: deleted }));
});

const paginateByProductId = asyncHandler(
  async (req: Request, res: Response) => {
    const { pageStr, limitStr, id } = req.query;
    const page = Number(pageStr);
    const limit = Number(limitStr);
    const productId = new Types.ObjectId(id?.toString());
    const { movements, total_rows } =
      await stockMovementService.paginateByProductId(page, limit, productId);

    res.status(200).json(new SuccessResponse({ movements, total_rows }));
  }
);

const stockMovementController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginateByProductId,
};

export default stockMovementController;
