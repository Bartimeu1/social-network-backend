import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/userController';

const router = Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  UserController.registration,
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  UserController.login,
);

router.post('/logout', UserController.logout);

router.get('/refresh', UserController.refresh);

export default router;
