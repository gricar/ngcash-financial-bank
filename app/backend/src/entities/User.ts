import {
  Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne,
} from 'typeorm';
import { Account } from './Account';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}