import { Router } from 'express';
import usersController from '../controllers/usersController';

const users = Router();

users.post('/register', usersController.register);

export default users;
