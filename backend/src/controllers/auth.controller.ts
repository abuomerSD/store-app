import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types";
import { UserModel } from "../models/user.model";
import { JWT_SECRET } from "../config/env";
import { TOKEN_EXPIRES_IN } from "../config/constants";
import { FailResponse, SuccessResponse } from "../utils/responseTypes";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const foundUser: IUser | null = await UserModel.findOne({
    username,
  });

  if (foundUser) {
    const passwordIsMatch = await bcrypt.compare(password, foundUser.password);

    const { _id, role } = foundUser;

    if (passwordIsMatch) {
      const token = jwt.sign(
        {
          id: _id,
          username,
          role,
        },
        JWT_SECRET,
        {
          expiresIn: TOKEN_EXPIRES_IN,
        }
      );

      res.status(200).json(new SuccessResponse({ token }));
    } else {
      res.status(401).json(
        new FailResponse({
          message_en: "invalid username or wrong password",
          message_ar: "خطأ في اسم المستخدم او كلمة السر",
        })
      );
    }
  } else {
    res
      .status(401)
      .json(
        new FailResponse({
          message_en: "invalid username or wrong password",
          message_ar: "خطأ في اسم المستخدم او كلمة السر",
        })
      );
  }
});

const authController = {
  login,
};

export default authController;
