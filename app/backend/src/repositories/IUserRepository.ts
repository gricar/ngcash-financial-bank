import { User } from '../entities/User';
import { IUser } from '../entities/interfaces/IUser';

export default interface IUserRepository {
  create: (user: IUser) => Promise<User | undefined>;
  findByName: (username: string) => Promise<User | null>;
  find: () => Promise<User[]>;
}