import { User } from '../entities/User';

export default interface IAccountRepository {
  registerTransaction: (loggedUser: User, recipientUser: User, amount: number) => Promise<void>;
}