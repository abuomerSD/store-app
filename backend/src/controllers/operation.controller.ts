import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import operationService from "../services/operation.service";
import { SuccessResponse } from "../utils/responseTypes";
import { IOperation } from "../types";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const operations = await operationService.findAll();
  res.status(200).json(new SuccessResponse({ operations }));
});

const findById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const operation = await operationService.findById(id);
  res.status(200).json(new SuccessResponse({ operation }));
});

const save = asyncHandler(async (req: Request, res: Response) => {
  const operation: IOperation = req.body;
  const saved = await operationService.save(operation);
  res.status(201).json(new SuccessResponse({ operation: saved }));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const operation = req.body;
  const updated = await operationService.updateById(id, operation);
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await operationService.deleteById(id);
  res.status(200).json({ operation: deleted });
});

const operationController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default operationController;
