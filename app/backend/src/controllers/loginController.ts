import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUserRepository from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import LoginUser from '../useCases/users/login';

class LoginController {
  private usersRepository: IUserRepository;

  constructor() {
    this.usersRepository = new UserRepository();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const loginCase = new LoginUser(this.usersRepository);

    const token = await loginCase.execute(req.body);

    return res.status(StatusCodes.OK).json({ token });
  };
}

export default new LoginController();
