import { NextFunction, Request, Response } from "express";
import { FailResponse } from "../utils/responseTypes";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json(new FailResponse({ message: "route not found" }));
};
