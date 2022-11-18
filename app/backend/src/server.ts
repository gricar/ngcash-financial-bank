import 'dotenv/config';
import { app } from './app';
import { AppDataSource } from './database/data-source';

const { API_PORT } = process.env;

AppDataSource.initialize()
  .then(() => {
    return app.listen(API_PORT, () => console.log(`Server is running on PORT: ${API_PORT}`));
  })
  .catch((err) => {
    throw new Error(`Error during Data Source initialization\n${err}'`);
  });
