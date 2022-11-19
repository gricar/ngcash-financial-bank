import { Request, Response, Router } from 'express';
import { NotFoundError } from '../helpers/api-errors';
import usersRoute from './users';
import loginRoute from './login';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/login', loginRoute);

routes.all('*', (req: Request, _res: Response): Error => {
  throw new NotFoundError(`Route '${req.path}' doesn't exist!`);
});

export default routes;
