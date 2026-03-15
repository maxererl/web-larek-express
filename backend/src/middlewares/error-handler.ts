import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors';

export default (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};
