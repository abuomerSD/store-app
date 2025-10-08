import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validations/validator";
import { FailResponse } from "../../utils/responseTypes";
import { categoryValidationSchema } from "../../validations/category.schema";

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Validator.validate(categoryValidationSchema, req.body);

  if (result.error) {
    return res
      .status(400)
      .json(new FailResponse({ message: result.error.details }));
  }
  next();
};
