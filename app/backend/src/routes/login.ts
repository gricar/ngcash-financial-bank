import { Router } from 'express';
import usersController from '../controllers/usersController';
import validateUser from '../middlewares/validateUser';

const users = Router();

users.post('/', validateUser, usersController.authenticate);

export default users;
