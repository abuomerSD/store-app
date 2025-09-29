import { Request, Response } from "express";
import { ICategory } from "../types";

const findAll = async () => {};

const findById = async (id: string) => {};

const save = async (category: ICategory) => {};

const updateById = async (id: string, category: ICategory) => {};

const deleteById = async (id: string) => {};

const stockMovementService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default stockMovementService;
