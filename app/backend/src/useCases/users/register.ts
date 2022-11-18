import IUserRepository from "../../repositories/IUserRepository";
import { ConflictError } from "../../helpers/api-errors";
import { IUser } from "../../entities/interfaces/IUser";
import { User } from "../../entities/User";
import { generateHashPassword } from "../../helpers/brcypt";

export default class RegisterUser {
  private repository: IUserRepository;
  
  constructor (repository: IUserRepository){
    this.repository = repository;
  }

  execute = async (user: IUser): Promise<User> => {
    const foundUser = await this.repository.findByName(user.username);

    if(foundUser){
      throw new ConflictError('User already exists!');
    }

    const hashPwd = await generateHashPassword(user.password);

    user.password = hashPwd;

    return this.repository.create(user);
  }
}