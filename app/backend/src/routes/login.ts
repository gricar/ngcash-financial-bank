import { Router } from 'express';
import loginController from '../controllers/loginController';
import validateUser from '../middlewares/validateUser';

const users = Router();

users.post('/', validateUser, loginController.login);

export default users;
