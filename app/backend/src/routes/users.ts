import { Router } from 'express';
import usersController from '../controllers/usersController';
import validateUser from '../middlewares/validateUser';

const users = Router();

users.get('/', usersController.getAll);
users.get('/:id', usersController.getById);
users.post('/register', validateUser, usersController.register);

export default users;
