import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = String(process.env.JWT_SECRET);

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const generateToken = (payload: string): string => {
  return jwt.sign({ payload }, JWT_SECRET, jwtConfig);
};
