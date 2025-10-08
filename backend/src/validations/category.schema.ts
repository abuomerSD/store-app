import joi from "joi";

export const categoryValidationSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});
