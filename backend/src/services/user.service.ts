import bcrypt from "bcrypt";

import { UserModel } from "../models/user.model";
import { IUser } from "../types";

const findAll = async (): Promise<IUser[]> => {
  const users = await UserModel.find();
  const arr: IUser[] = users.map((user) => {
    return {
      username: user.username,
      role: user.role,
      password: "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  });
  // console.log("arr", arr);
  return arr;
};

const findById = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findById(id);
  if (user) {
    const obj: IUser = {
      username: user.username,
      password: "",
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return obj;
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

const paginate = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const users = await UserModel.find()
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = (await UserModel.find()).length;
  const usersArr = users.map((user) => {
    return {
      _id: user._id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  });
  return {
    total_rows,
    users: usersArr,
  };
};

const userService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
};

export default userService;
