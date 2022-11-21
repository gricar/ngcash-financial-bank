import { NextFunction, Request, Response } from 'express';
import transaction from './schemas/transaction';

const validateTransaction = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = transaction.validate(req.body);

  if (error) return next(error);

  return next();
};

export default validateTransaction;
