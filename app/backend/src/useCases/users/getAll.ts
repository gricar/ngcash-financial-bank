import IUserRepository from '../../repositories/IUserRepository';
import { User } from '../../entities/User';

export default class GetAllUsers {
  private repository: IUserRepository;
  
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  execute = async (): Promise<User[]> => {
    return this.repository.find();
  };
}
