import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { FailResponse } from "../utils/responseTypes";
import { IReqUser } from "../types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(
      new FailResponse({
        message_en: "Access denied. No valid token format found.",
        message_ar: "لا يمكنك الوصول : التوكن غير موجود",
      })
    );
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IReqUser;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return res.status(401).json(
      new FailResponse({
        message_en: "Invalid or expired token.",
        message_ar: "توكن غير صحيحة او منتهية",
      })
    );
  }
};

export const roleAuthMiddleware = (acceptedRoles: Array<"admin" | "user">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IReqUser | undefined;

    if (!user) {
      return res.status(401).json(
        new FailResponse({
          message_en: "Access denied. Authentication required.",
          message_ar: "الوصول ممنوع. يتطلب تسجيل الدخول.",
        })
      );
    }

    if (acceptedRoles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json(
        new FailResponse({
          message_en: `Access denied. Role '${user.role}' is not authorized for this route.`,
          message_ar: `الوصول ممنوع . المستخدم غير مصرح به لهذا المسار`,
        })
      );
    }
  };
};
