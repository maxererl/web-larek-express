import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import product from '../models/product';
import { BadRequestError } from '../errors';

interface IOrderRequest {
  items: string[],
  total: number,
  payment: 'card' | 'online',
  email: string,
  phone: string,
  address: string
}

async function validateItems(body: IOrderRequest) {
  const { items, total } = body;
  const storedItems = await product.find({ _id: items });
  return storedItems.filter((item) => item.price || item.price === 0).length === items.length
    && storedItems.reduce((acc, item) => acc + item.price!, 0) === total;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!await validateItems(req.body)) {
    return next(new BadRequestError('Ошибка валидации данных при создании заказа'));
  }
  return res.send({ id: faker.string.uuid(), total: req.body.total });
};
