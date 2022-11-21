import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';

export default interface ITransactionRepository {
  userDebiteds: (debitedAcc: Account) => Promise<Transaction[]>;
  userCrediteds: (creditedAcc: Account) => Promise<Transaction[]>;
}