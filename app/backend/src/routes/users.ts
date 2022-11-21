import { Router } from 'express';
import usersController from '../controllers/usersController';
import auth from '../middlewares/auth';
import validateUser from '../middlewares/validateUser';

const users = Router();

users.use(auth);
users.get('/', usersController.getAll);
users.get('/:id', usersController.getById);
users.post('/register', validateUser, usersController.register);

export default users;
