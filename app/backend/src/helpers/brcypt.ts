import bcrypt from 'bcrypt';

const saltRounds = 10;

export const generateHashPassword = async (password: string): Promise<string> => {
  const hashPwd = await bcrypt.hash(password, saltRounds);
  return hashPwd;
};


export const comparePassword = async (password: string, hashPwd: string): Promise<boolean> => {
  const result = await bcrypt.compare(password, hashPwd);
  return result;
};