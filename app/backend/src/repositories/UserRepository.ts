import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import IUserRepository from "./IUserRepository";
import { User } from "../entities/User";
import { IUser } from "../entities/interfaces/IUser";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create({ username, password }: IUser): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async findByName(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
}