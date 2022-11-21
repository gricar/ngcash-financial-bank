import { Router } from 'express';
import profileController from '../controllers/profileController';
import auth from '../middlewares/auth';
import validateTransaction from '../middlewares/validateTransaction';

const profile = Router();

profile.use(auth);
profile.get('/', profileController.getUser);
profile.post('/money-transfer', validateTransaction, profileController.moneyTransfer);
profile.get('/transactions', profileController.listTransactions);

export default profile;
