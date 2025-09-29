import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
}

export interface IReqUser extends JwtPayload {
  id: string;
  username: string;
  role: "admin" | "user";
}
