import IUserRepository from '../../repositories/IUserRepository';
import { NotFoundError } from '../../helpers/api-errors';
import ITransactionRepository from '../../repositories/ITransactionRepository';

export default class UsersTransactions {
  private userRepo: IUserRepository;

  private transactionsRepo: ITransactionRepository;
  
  constructor(userRepo: IUserRepository, transactionsRepo: ITransactionRepository) {
    this.userRepo = userRepo;
    this.transactionsRepo = transactionsRepo;
  }

  execute = async (id: string) => {
    const userLogged = await this.userRepo.findById(id);

    if (!userLogged) {
      throw new NotFoundError('User not found!');
    }

    const cashOutTransactions = await this.transactionsRepo.userDebiteds(userLogged.account);

    const cashInTransactions = await this.transactionsRepo.userCrediteds(userLogged.account);

    return { cashOutTransactions, cashInTransactions };    
  };
}
