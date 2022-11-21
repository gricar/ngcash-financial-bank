import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import GetUserById from '../useCases/users/getById';

class ProfileController {
  private usersRepository: IUserRepository;

  constructor() {
    this.usersRepository = new UserRepository();
  }

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const getByIdUserCase = new GetUserById(this.usersRepository);

    const id = req.userId as User['id'];

    const userFound = await getByIdUserCase.execute(id);

    return res.status(StatusCodes.OK).json(userFound);
  };
}

export default new ProfileController();
