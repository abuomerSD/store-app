import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/responseTypes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json(new ErrorResponse(err));
  next();
};
