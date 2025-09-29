import { NextFunction, Request, Response } from "express";
import { FailResponse } from "../utils/responseTypes";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json(
    new FailResponse({
      message_en: "route not found",
      message_ar: "المسار غير موجود",
    })
  );
};
