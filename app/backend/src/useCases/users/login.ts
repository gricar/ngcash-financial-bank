import IUserRepository from "../../repositories/IUserRepository";
import { NotFoundError, UnauthorizedError } from "../../helpers/api-errors";
import { IUser } from "../../entities/interfaces/IUser";
import { comparePassword } from "../../helpers/brcypt";
import { generateToken } from "../../helpers/jwt";

export default class LoginUser {
  private repository: IUserRepository;
  
  constructor (repository: IUserRepository){
    this.repository = repository;
  }

  execute = async (user: IUser): Promise<string> => {
    const foundUser = await this.repository.findByName(user.username);

    if(!foundUser){
      throw new NotFoundError('User does not exists!');
    }

    const isLoginValid = await comparePassword(user.password, foundUser.password);

    if (!isLoginValid) {
      throw new UnauthorizedError('Password not valid, try again.')
    }

    return generateToken(foundUser.id);
  }
}