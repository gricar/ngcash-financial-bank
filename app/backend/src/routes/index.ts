import { Request, Router } from 'express';
import { NotFoundError } from '../helpers/api-errors';
import usersRoute from './users';
import loginRoute from './login';
import profileRoute from './profile';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/profile', profileRoute);
routes.use('/login', loginRoute);

routes.all('*', (req: Request): Error => {
  throw new NotFoundError(`Route '${req.path}' doesn't exist!`);
});

export default routes;
