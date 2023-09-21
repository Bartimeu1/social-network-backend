import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.post('/user/add', UserController.registration);

export default router;
