import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUserRepository from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import GetAllUsers from '../useCases/users/getAll';
import GetUserById from '../useCases/users/getById';
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

    const userFound = await getByIdUserCase.execute(req.params.id);

    return res.status(StatusCodes.OK).json(userFound);
  };
}

export default new UsersController();
