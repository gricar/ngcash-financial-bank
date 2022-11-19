import IUserRepository from '../../repositories/IUserRepository';
import { User } from '../../entities/User';
import { NotFoundError } from '../../helpers/api-errors';

export default class GetUserById {
  private repository: IUserRepository;
  
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  execute = async (id: string): Promise<User | Error> => {
    const foundUser = await this.repository.findById(id);

    if (!foundUser) {
      throw new NotFoundError('User not found!');
    }

    return foundUser;
  };
}
