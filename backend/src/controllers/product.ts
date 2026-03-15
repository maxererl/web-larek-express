import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import product from '../models/product';
import { BadRequestError, ConflictError } from '../errors';

export const getAllProducts = async (_: Request, res: Response, next: NextFunction) => {
  product.find({})
    .then((prods) => res.send({ items: prods, total: prods.length }))
    .catch(() => next(new Error('Произошла ошибка')));
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  product.create(req.body)
    .then((prod) => res.status(201).send({ data: prod.toJSON() }))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(err.message));
      } if (err instanceof Error && err.message.includes('E11000')) {
        return next(new ConflictError('Продукт с таким названием уже существует'));
      }
      return next(new Error('Произошла ошибка'));
    });
};
