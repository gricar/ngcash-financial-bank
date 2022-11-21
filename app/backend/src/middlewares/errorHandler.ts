import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../helpers/api-errors';

const errorHandler = (
  err: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message ?? 'Internal server error';

  return res.status(statusCode).json({ message });
};

export default errorHandler;
