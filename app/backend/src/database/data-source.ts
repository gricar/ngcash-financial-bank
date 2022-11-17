import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
