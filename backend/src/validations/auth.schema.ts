import joi from "joi";

export const authValidationSchema = joi.object({
  username: joi.string().min(5).max(15).required(),
  password: joi.string().min(5).max(15).required(),
});
