import {
  Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { Account } from './Account';

@Entity('transactions')
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.debitedtransactions)
  @JoinColumn({ name: 'debitedAccountId' })
  debitedAccount: Account;
  
  @ManyToOne(() => Account, (account) => account.creditedtransactions)
  @JoinColumn({ name: 'creditedAccountId' })
  creditedAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}