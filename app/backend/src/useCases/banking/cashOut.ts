import IUserRepository from '../../repositories/IUserRepository';
import { BadRequestError, ConflictError, NotFoundError } from '../../helpers/api-errors';
import { IMoneyTransaction } from '../../entities/interfaces/ITransaction';
import IAccountRepository from '../../repositories/IAccountRepository';

export default class CashOut {
  private userRepository: IUserRepository;

  private accountRepository: IAccountRepository;
  
  constructor(userRepository: IUserRepository, accountRepository: IAccountRepository) {
    this.userRepository = userRepository;
    this.accountRepository = accountRepository;
  }

  execute = async (id: string, { usernameRecipient,  amount }: IMoneyTransaction) => {
    const userLogged = await this.userRepository.findById(id);

    const userRecipient = await this.userRepository.findByName(usernameRecipient);

    if (!userRecipient) {
      throw new NotFoundError("The recipient's username doesn't exists!");
    }

    if (userLogged?.username == usernameRecipient) {
      throw new ConflictError("The recipient's username cannot be the same as the source user's");
    }

    const userLoggedBalance: number = userLogged!.account.balance;

    if (amount > userLoggedBalance) {
      throw new BadRequestError(
        `You do not have enough money. You can only transfer up to $${userLoggedBalance}`,
      );
    }

    await this.accountRepository.registerTransaction(userLogged!, userRecipient, amount);
  };
}
