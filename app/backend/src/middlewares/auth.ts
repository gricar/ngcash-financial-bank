import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../helpers/api-errors';
import TokenAuthentication from '../helpers/jwt';

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new NotFoundError('Token not found');
  }

  const decode = TokenAuthentication.validateToken(token);

  req.userId = decode?.payload;

  return next();
};

export default auth;
