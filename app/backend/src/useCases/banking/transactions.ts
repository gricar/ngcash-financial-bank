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

  execute = async (id: string, sortDate: string) => {
    const userLog = await this.userRepo.findById(id);

    if (!userLog) {
      throw new NotFoundError('User not found!');
    }

    const cashOutTransactions = await this.transactionsRepo.userDebiteds(userLog.account, sortDate);

    const cashInTransactions = await this.transactionsRepo.userCrediteds(userLog.account, sortDate);

    return { cashOutTransactions, cashInTransactions };    
  };
}
