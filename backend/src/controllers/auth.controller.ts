import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IOperation, IUser } from "../types";
import { UserModel } from "../models/user.model";
import { JWT_SECRET } from "../config/env";
import { TOKEN_EXPIRES_IN_SEC } from "../config/constants";
import { FailResponse, SuccessResponse } from "../utils/responseTypes";
import { OperationModel } from "../models/operation.model";
import { Types } from "mongoose";

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
          expiresIn: TOKEN_EXPIRES_IN_SEC,
        }
      );

      const userData = {
        username,
        role: foundUser.role,
      };

      res.cookie("auth_token", token, {
        maxAge: TOKEN_EXPIRES_IN_SEC * 1000,
        httpOnly: true,
        sameSite: "strict",
      });

      // operation

      const operation: IOperation = {
        action: "USER_LOGIN",
        entity: "USER",
        entityId: foundUser._id,
        description: {
          en: "User Login",
          ar: "تسجيل دخول مستخدم",
        },
        user: foundUser?._id,
      };
      await OperationModel.create(operation);

      res
        .status(200)
        .json(new SuccessResponse({ user: userData, auth_token: token }));
    } else {
      res.status(401).json(
        new FailResponse({
          message_en: "invalid username or wrong password",
          message_ar: "خطأ في اسم المستخدم او كلمة السر",
        })
      );
    }
  } else {
    res.status(401).json(
      new FailResponse({
        message_en: "invalid username or wrong password",
        message_ar: "خطأ في اسم المستخدم او كلمة السر",
      })
    );
  }
});

const verify = asyncHandler(async (req: Request, res: Response) => {
  const { auth_token } = req.body;
  const decoded = jwt.verify(auth_token, JWT_SECRET);
  console.log(decoded);
  if (decoded) {
    res.status(200).json(new SuccessResponse({ decoded }));
  } else {
    throw new Error("token Not Valid");
  }
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  // operation

  const user = req.user;
  const userId = new Types.ObjectId(user?.id);

  const operation: IOperation = {
    action: "USER_LOGOUT",
    entity: "USER",
    entityId: userId,
    description: {
      en: "User Logout",
      ar: "تسجيل خروج مستخدم",
    },
    user: userId,
  };
  await OperationModel.create(operation);

  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json(new SuccessResponse({ message: "logout successful" }));
});

const authController = {
  login,
  verify,
  logout,
};

export default authController;
