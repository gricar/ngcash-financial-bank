import IUserRepository from "../../repositories/IUserRepository";
import { ConflictError } from "../../helpers/api-errors";
import { IUser } from "../../entities/interfaces/IUser";

export default class RegisterUser {
  private repository: IUserRepository;
  
  constructor (repository: IUserRepository){
    this.repository = repository;
  }

  execute = async (user: IUser): Promise<IUser | Error> => {
    const foundUser = await this.repository.findByName(user.username);

    if(foundUser){
      throw new ConflictError('User already exists!');
    }

    return await this.repository.create(user);
  }
}