import bcrypt from 'bcrypt';

class HashPassword {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = 10;
  }

  public async generate(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public async comparePassword(password: string, hashPwd: string): Promise<boolean> {
    return bcrypt.compare(password, hashPwd);
  }
}

export default new HashPassword();
