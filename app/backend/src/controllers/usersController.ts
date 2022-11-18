import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUserRepository from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import RegisterUser from '../useCases/users/register';

class UsersController {
  private usersRepository: IUserRepository;

  constructor(){
    this.usersRepository = new UserRepository();
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    const registerUserCase = new RegisterUser(this.usersRepository);

    const newUser = await registerUserCase.execute(req.body);

    return res.status(StatusCodes.CREATED).json(newUser);
  }
}

export default new UsersController();
