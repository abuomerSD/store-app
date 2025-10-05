import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import unitDefinitionService from "../services/unitDefinition.service";
import { SuccessResponse } from "../utils/responseTypes";
import { IUnitDefinition } from "../types";
import { Types } from "mongoose";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const units = await unitDefinitionService.findAll();
  res.status(200).json(new SuccessResponse({ units }));
});

const findById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const unit = await unitDefinitionService.findById(id);
  res.status(200).json(new SuccessResponse({ unit }));
});

const save = asyncHandler(async (req: Request, res: Response) => {
  const unit: IUnitDefinition = req.body;
  const user = req.user;
  if (user) {
    unit.createdBy = new Types.ObjectId(user.id);
    const saved = await unitDefinitionService.save(unit);
    res.status(201).json(new SuccessResponse({ unit: saved }));
  } else {
  }
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const unit: IUnitDefinition = req.body;
  const updated = await unitDefinitionService.updateById(id, unit);
  res.status(200).json(new SuccessResponse({ unit: updated }));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await unitDefinitionService.deleteById(id);
  res.status(200).json(new SuccessResponse({ unit: deleted }));
});

const paginate = asyncHandler(async (req: Request, res: Response) => {
  const { pageStr, limitStr } = req.query;
  const page = Number(pageStr);
  const limit = Number(limitStr);
  const { units, total_rows } = await unitDefinitionService.paginate(
    page,
    limit
  );
  res.status(200).json(new SuccessResponse({ units, total_rows }));
});

const unitController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
};

export default unitController;
