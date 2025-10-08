import joi from "joi";

export const productValidationSchema = joi.object({
  code: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  minStockQty: joi.number().required(),
  category: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  units: joi
    .array()
    .items(
      joi.object({
        name: joi.string().required(),
        isBaseUnit: joi.boolean().required(),
        piecesInUnit: joi.number().required(),
      })
    )
    .required(),
});
