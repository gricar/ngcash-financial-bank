import { Router } from 'express';
import profileController from '../controllers/profileController';
import auth from '../middlewares/auth';

const profile = Router();

profile.use(auth);
profile.get('/', profileController.getUser);

export default profile;
