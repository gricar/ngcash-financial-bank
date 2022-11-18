import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}