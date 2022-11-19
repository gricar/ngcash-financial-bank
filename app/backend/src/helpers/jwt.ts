import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = String(process.env.JWT_SECRET);

class TokenAuthentication {
  private jwtConfig: SignOptions;
  
  private jwtSecret: string;

  constructor() {
    this.jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    this.jwtSecret = JWT_SECRET;
  }

  public generateToken(payload: string): string {
    return jwt.sign({ payload }, this.jwtSecret, this.jwtConfig);
  }
}

export default new TokenAuthentication();
