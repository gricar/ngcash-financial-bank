import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { UnauthorizedError } from './api-errors';

class TokenAuthentication {
  private jwtConfig: SignOptions;
  
  private jwtSecret: string;

  constructor() {
    this.jwtConfig = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };
    this.jwtSecret = String(process.env.JWT_SECRET);
  }

  public generateToken(payload: string): string {
    return jwt.sign({ payload }, this.jwtSecret, this.jwtConfig);
  }

  public validateToken(token: string): string | JwtPayload | undefined {
    try {
      const decode = jwt.verify(token, this.jwtSecret);

      return decode;
    } catch (err) {
      if (err instanceof Error) {
        throw new UnauthorizedError(err.message);
      }
    }
  }
}

export default new TokenAuthentication();
