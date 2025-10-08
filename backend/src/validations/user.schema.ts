import joi from "joi";

export const userValidationSchema = joi.object({
  username: joi.string().min(5).max(30).required(),
  password: joi.string().min(5).max(30).required(),
  role: joi.string().required(),
});
