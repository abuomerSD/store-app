import { Request, Response } from "express";
import { ICategory, IStockMovement } from "../types";
import { StockMovementModel } from "../models/stockMovement.model";

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

const stockMovementService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default stockMovementService;
