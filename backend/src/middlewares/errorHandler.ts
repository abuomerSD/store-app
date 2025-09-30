import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/responseTypes";
import { error } from "console";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json(new ErrorResponse(err));
  console.log(err);
  next();
};
