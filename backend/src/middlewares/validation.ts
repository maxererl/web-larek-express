import { celebrate, Joi, Segments } from 'celebrate';

const createProductSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().allow(null),
});

const makeOrderSchema = Joi.object({
  items: Joi.array().min(1).required(),
  total: Joi.number().required(),
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

export const createProductValidator = celebrate({
  [Segments.BODY]: createProductSchema,
});

export const makeOrderValidator = celebrate({
  [Segments.BODY]: makeOrderSchema,
});
