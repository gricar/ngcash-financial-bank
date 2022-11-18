import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accounts')
export class Account {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 100,
  })
  balance: number;
}