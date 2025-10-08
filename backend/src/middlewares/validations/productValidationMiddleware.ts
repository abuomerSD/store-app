import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validations/validator";
import { FailResponse } from "../../utils/responseTypes";
import { productValidationSchema } from "../../validations/product.schema";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Validator.validate(productValidationSchema, req.body);

  if (result.error) {
    return res
      .status(400)
      .json(new FailResponse({ message: result.error.details }));
  }
  next();
};
