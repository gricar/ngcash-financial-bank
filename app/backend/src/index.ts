import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';

const { API_PORT } = process.env;

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.get('/', (req, res) => {
      return res.json('Tudo certo');
    });

    return app.listen(API_PORT, () => console.log(`Server is running on PORT: ${API_PORT}`));
  })
  .catch((err) => {
    throw new Error(`Error during Data Source initialization\n${err}'`);
  });
