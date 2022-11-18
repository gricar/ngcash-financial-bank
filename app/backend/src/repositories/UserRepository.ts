import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import IUserRepository from "./IUserRepository";
import { User } from "../entities/User";
import { IUser } from "../entities/interfaces/IUser";
import { Account } from "../entities/Account";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;
  private accountRepository: Repository<Account>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.accountRepository = AppDataSource.getRepository(Account);
  }

  async create({ username, password }: IUser): Promise<User> {
    await this.userRepository.queryRunner?.startTransaction();

    try{
      const newAccount = this.accountRepository.create();

      await this.accountRepository.save(newAccount);

      const newUser = this.userRepository.create({
        username,
        password,
        account: newAccount
      });
  
      await this.userRepository.save(newUser);
  
      await this.userRepository.queryRunner?.commitTransaction();
      return newUser;

      } catch (err) {
          await this.userRepository.queryRunner?.rollbackTransaction();
      } finally {
          await this.userRepository.queryRunner?.release();
      }
    
  }

  async findByName(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
}