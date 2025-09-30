import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import stockMovementService from "../services/stockMovement.service";
import { SuccessResponse } from "../utils/responseTypes";
import { IStockMovement } from "../types";

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

const stockMovementController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default stockMovementController;
