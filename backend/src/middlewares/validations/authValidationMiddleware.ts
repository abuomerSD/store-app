import { NextFunction, Request, Response } from "express";
import { Validator } from "../../validations/validator";
import { authValidationSchema } from "../../validations/auth.schema";
import { FailResponse } from "../../utils/responseTypes";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Validator.validate(authValidationSchema, req.body);

  if (result.error) {
    return res
      .status(400)
      .json(new FailResponse({ message: result.error.details }));
  }
  next();
};
