import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../entities/User';
import IAccountRepository from '../repositories/IAccountRepository';
import IUserRepository from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { AccountRepository } from '../repositories/AccountRepository';
import CashOut from '../useCases/banking/cashOut';
import GetUserById from '../useCases/users/getById';
import ITransactionRepository from '../repositories/ITransactionRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import UsersTransactions from '../useCases/banking/transactions';

class ProfileController {
  private usersRepository: IUserRepository;

  private accountRepository: IAccountRepository;

  private transactionsRepository: ITransactionRepository;

  constructor() {
    this.usersRepository = new UserRepository();
    this.accountRepository = new AccountRepository();
    this.transactionsRepository = new TransactionRepository();
  }

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const getByIdUserCase = new GetUserById(this.usersRepository);

    const id = req.userId as User['id'];

    const userFound = await getByIdUserCase.execute(id);

    return res.status(StatusCodes.OK).json(userFound);
  };

  public moneyTransfer = async (req: Request, res: Response): Promise<Response> => {
    const cashOutBankingCase = new CashOut(this.usersRepository, this.accountRepository);

    const id = req.userId as User['id'];

    await cashOutBankingCase.execute(id, req.body);

    return res.status(StatusCodes.OK).send('Successful transfer!');
  };

  public listTransactions = async (req: Request, res: Response): Promise<Response> => {
    const transactionsBankingCase = new UsersTransactions(
      this.usersRepository, this.transactionsRepository,
    );
    
    const id = req.userId as User['id'];

    const { cashOutTransactions, cashInTransactions } = await transactionsBankingCase.execute(id);

    return res.status(StatusCodes.OK).json({ cashOutTransactions, cashInTransactions });
  };
}

export default new ProfileController();
