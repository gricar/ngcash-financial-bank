import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
