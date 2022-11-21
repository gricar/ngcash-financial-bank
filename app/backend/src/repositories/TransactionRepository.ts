import { Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
import ITransactionRepository from './ITransactionRepository';

export class TransactionRepository implements ITransactionRepository {
  private transactionRepo: Repository<Transaction>;

  private accountRepo: Repository<Account>;

  constructor() {
    this.transactionRepo = AppDataSource.getRepository(Transaction);
    this.accountRepo = AppDataSource.getRepository(Account);
  }
  
  async userDebiteds(debitedAcc: Account): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: {
        debitedAccount: debitedAcc,
      },
      relations: {
        creditedAccount: true,
      },
      select: {
        creditedAccount: {
          id: true,
        },
      },
    });
  }

  async userCrediteds(creditedAcc: Account): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: {
        creditedAccount: creditedAcc,
      },
      relations: {
        debitedAccount: true,
      },
      select: {
        debitedAccount: {
          id: true,
        },
      },
    });
  }
}