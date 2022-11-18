import { Router } from 'express';
import { NotFoundError } from '../helpers/api-errors';
import investmentsRoute from './investments';
//import loginRoute from './loginRoute';

const routes = Router();

//routes.use('/investments', investmentsRoute);
//routes.use('/login', loginRoute);
routes.get('/', (req, res) => res.send("ok"));

routes.all('*', (req, _res, next) => {
  throw new NotFoundError(`Route '${req.path}' doesn't exist!`)
});

export default routes;
