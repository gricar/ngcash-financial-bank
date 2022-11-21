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
  
  async userDebiteds(debitedAcc: Account, sortDate: string): Promise<Transaction[]> {

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
      order: {
        createdAt: sortDate ? 'ASC' : 'DESC',
      },
    });
  }

  async userCrediteds(creditedAcc: Account, sortDate: string): Promise<Transaction[]> {
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
      order: {
        createdAt:  sortDate ? 'ASC' : 'DESC',
      },
    });
  }
}