import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUserRepository from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import GetAllUsers from '../useCases/users/getAll';
import GetUserById from '../useCases/users/getById';
import LoginUser from '../useCases/users/login';
import RegisterUser from '../useCases/users/register';

class UsersController {
  private usersRepository: IUserRepository;

  constructor() {
    this.usersRepository = new UserRepository();
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    const registerUserCase = new RegisterUser(this.usersRepository);

    const newUser = await registerUserCase.execute(req.body);

    return res.status(StatusCodes.CREATED).json(newUser);
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const getAllUserCase = new GetAllUsers(this.usersRepository);

    const users = await getAllUserCase.execute();

    return res.status(StatusCodes.OK).json(users);
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const getByIdUserCase = new GetUserById(this.usersRepository);

    const user = await getByIdUserCase.execute(req.params.id);

    return res.status(StatusCodes.OK).json(user);
  };

  public authenticate = async (req: Request, res: Response): Promise<Response> => {
    const loginCase = new LoginUser(this.usersRepository);

    const token = await loginCase.execute(req.body);

    return res.status(StatusCodes.OK).json({ token });
  };
}

export default new UsersController();
