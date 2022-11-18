import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';
@Entity('accounts')
export class Account {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 100,
  })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  debitedtransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  creditedtransactions: Transaction[];
}