import IUserRepository from '../../repositories/IUserRepository';
import { NotFoundError, UnauthorizedError } from '../../helpers/api-errors';
import { IUser } from '../../entities/interfaces/IUser';
import HashPassword from '../../helpers/brcypt';
import TokenAuthentication from '../../helpers/jwt';

export default class LoginUser {
  private repository: IUserRepository;
  
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  execute = async ({ username, password }: IUser): Promise<string> => {
    const foundUser = await this.repository.findByName(username);

    if (!foundUser) {
      throw new NotFoundError('User does not exists!');
    }

    const isLoginValid = await HashPassword.comparePassword(password, foundUser.password);

    if (!isLoginValid) {
      throw new UnauthorizedError('Password not valid, try again.');
    }

    return TokenAuthentication.generateToken(foundUser.id);
  };
}