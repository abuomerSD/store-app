import joi from "joi";

export const productMovementValidationSchema = joi.object({
  productId: joi.string().required(),
  note: joi.string().required(),
  qty: joi.number().required(),
  selectedUnit: joi.string().required(),
});
