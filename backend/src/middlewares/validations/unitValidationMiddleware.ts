import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validations/validator";
import { FailResponse } from "../../utils/responseTypes";
import { unitValidationSchema } from "../../validations/unit.schema";

export const validateUnit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Validator.validate(unitValidationSchema, req.body);

  if (result.error) {
    return res
      .status(400)
      .json(new FailResponse({ message: result.error.details }));
  }
  next();
};
