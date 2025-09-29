import bcrypt from "bcrypt";

import { UserModel } from "../models/user.model";
import { IUser } from "../types";

const findAll = async (): Promise<IUser[]> => {
  const users = await UserModel.find();
  return users;
};

const findById = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const save = async (user: IUser): Promise<IUser> => {
  user.password = await bcrypt.hash(user.password, 10);
  const saved = await UserModel.create(user);
  return saved;
};

const updateById = async (id: string, user: IUser): Promise<IUser | null> => {
  user.password = await bcrypt.hash(user.password, 10);
  const updated = await UserModel.findOneAndUpdate({ _id: id }, user);
  return updated;
};

const deleteById = async (id: string) => {
  const deleted = await UserModel.findOneAndDelete({ _id: id });
  return deleted;
};

const userService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default userService;
