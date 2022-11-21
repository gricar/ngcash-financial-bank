import { Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';
import IAccountRepository from './IAccountRepository';

export class AccountRepository implements IAccountRepository {
  private accountRepo: Repository<Account>;

  private transactionRepo: Repository<Transaction>;

  constructor() {
    this.accountRepo = AppDataSource.getRepository(Account);
    this.transactionRepo = AppDataSource.getRepository(Transaction);
  }
  
  async registerTransaction(
    loggedUser: User, recipientUser: User, amount: number,
  ): Promise<void> {
    await this.transactionRepo.queryRunner?.startTransaction();

    const newBalanceLoggedUser = loggedUser.account.balance - amount;
    const newBalanceRecipientUser = recipientUser.account.balance + amount;

    try {
      const newTransaction = await this.transactionRepo.create({
        value: amount,
        creditedAccount: recipientUser.account,
        debitedAccount: loggedUser.account,
        createdAt: new Date(),
      });

      await this.transactionRepo.save(newTransaction);

      await this.accountRepo.update(
        { id: loggedUser.account.id },
        { balance: newBalanceLoggedUser },
      );

      await this.accountRepo.update(
        { id: recipientUser.account.id },
        { balance: newBalanceRecipientUser },
      );

      await this.transactionRepo.queryRunner?.commitTransaction();

    } catch (err) {
      await this.transactionRepo.queryRunner?.rollbackTransaction();
    } finally {
      await this.transactionRepo.queryRunner?.release();
    }
  }
}