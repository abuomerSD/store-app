import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userService from "../services/user.service";
import { SuccessResponse } from "../utils/responseTypes";
import { IUser } from "../types";

const findAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.findAll();
  res.status(200).json(new SuccessResponse({ users }));
});

const findById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.findById(id);
  res.status(200).json(new SuccessResponse({ user }));
});

const save = asyncHandler(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const saved = await userService.save(user);
  res.status(201).json(new SuccessResponse({ user: saved }));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: IUser = req.body;
  const updated = await userService.updateById(id, user);
  res.status(200).json(new SuccessResponse({ user: updated }));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await userService.deleteById(id);
  res.status(200).json(new SuccessResponse({ user: deleted }));
});

const paginate = asyncHandler(async (req: Request, res: Response) => {
  const { pageStr, limitStr } = req.query;
  const page = Number(pageStr);
  const limit = Number(limitStr);
  const { users, total_rows } = await userService.paginate(page, limit);
  res.status(200).json(new SuccessResponse({ users, total_rows }));
});

const userController = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
};

export default userController;
