import joi from "joi";

const validate = (
  schema: joi.ObjectSchema,
  payload: {}
): joi.ValidationResult => {
  return schema.validate(payload);
};

export const Validator = {
  validate,
};
