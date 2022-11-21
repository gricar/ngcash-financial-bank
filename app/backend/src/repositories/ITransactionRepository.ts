import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';

export default interface ITransactionRepository {
  userDebiteds: (debitedAcc: Account, sortDate: string) => Promise<Transaction[]>;
  userCrediteds: (creditedAcc: Account, sortDate: string) => Promise<Transaction[]>;
}