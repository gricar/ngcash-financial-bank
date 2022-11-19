import { User } from '../entities/User';
import { IUser } from '../entities/interfaces/IUser';

export default interface IUserRepository {
  create: (user: IUser) => Promise<User | undefined>;
  find: () => Promise<User[]>;
  findById: (id: string) => Promise<User | null>;
  findByName: (username: string) => Promise<User | null>;
}