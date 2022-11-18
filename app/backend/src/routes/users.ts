import { Router } from 'express';
import usersController from '../controllers/usersController';

const users = Router();

users.get('/', usersController.getAll);
users.post('/register', usersController.register);

export default users;
