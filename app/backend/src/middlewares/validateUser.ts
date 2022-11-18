import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userLogin from './schemas/userLogin'

const validateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = userLogin.validate(req.body);

  if (error?.isJoi) {
    const status = error.details[0].type
      .includes('required') ? 'BAD_REQUEST' : 'UNPROCESSABLE_ENTITY';

    const err = {
      statusCode: StatusCodes[status],
      message: error.details[0].message,
    } 
    return next(err)
  }

  return next();
};

export default validateUser;
