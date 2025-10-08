import { Request, Response } from "express";
import { ICategory, IStockMovement } from "../types";
import { StockMovementModel } from "../models/stockMovement.model";
import { Types } from "mongoose";

const findAll = async (): Promise<IStockMovement[] | null> => {
  const movements: IStockMovement[] = await StockMovementModel.find();
  if (movements) {
    return movements;
  }
  return null;
};

const findById = async (id: string): Promise<IStockMovement | null> => {
  const movement: IStockMovement | null = await StockMovementModel.findById(id);
  return movement;
};

const save = async (
  movement: IStockMovement
): Promise<IStockMovement | null> => {
  const saved: IStockMovement | null = await StockMovementModel.create(
    movement
  );
  return saved;
};

const updateById = async (
  id: string,
  movement: IStockMovement
): Promise<IStockMovement | null> => {
  const updated: IStockMovement | null =
    await StockMovementModel.findOneAndUpdate({ _id: id }, movement);
  return updated;
};

const deleteById = async (id: string): Promise<IStockMovement | null> => {
  const deleted: IStockMovement | null =
    await StockMovementModel.findOneAndDelete({ _id: id });
  return deleted;
};

const paginateByProductId = async (
  page: number,
  limit: number,
  id: Types.ObjectId
) => {
  const skip = (page - 1) * limit;
  console.log("type of id", typeof id);
  console.log("id", id);
  // const movements = await StockMovementModel.find();
  const movements = await StockMovementModel.find({ product: id })
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  console.log("movements", movements);
  const total_rows = (await StockMovementModel.find({ product: id })).length;
  return {
    total_rows,
    movements,
  };
};

const stockMovementService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginateByProductId,
};

export default stockMovementService;
