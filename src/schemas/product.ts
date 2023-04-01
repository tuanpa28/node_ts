import Joi from "joi";

export const proSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.string(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});
