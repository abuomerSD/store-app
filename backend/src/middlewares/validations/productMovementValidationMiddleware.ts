import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validations/validator";
import { FailResponse } from "../../utils/responseTypes";
import { productMovementValidationSchema } from "../../validations/productMovement.schema";

export const validateProductMovement = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Validator.validate(productMovementValidationSchema, req.body);

  if (result.error) {
    return res
      .status(400)
      .json(new FailResponse({ message: result.error.details }));
  }
  next();
};
