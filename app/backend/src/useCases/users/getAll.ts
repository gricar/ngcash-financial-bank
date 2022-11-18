import IUserRepository from "../../repositories/IUserRepository";
import { ConflictError } from "../../helpers/api-errors";
import { IUser } from "../../entities/interfaces/IUser";
import { User } from "../../entities/User";

export default class GetAllUsers {
  private repository: IUserRepository;
  
  constructor (repository: IUserRepository){
    this.repository = repository;
  }

  execute = async (): Promise<User[]> => {
    return await this.repository.find();
  }
}