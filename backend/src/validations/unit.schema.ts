import joi from "joi";

export const unitValidationSchema = joi.object({
  name: joi.string().required(),
  piecesInUnit: joi.number().required(),
});
