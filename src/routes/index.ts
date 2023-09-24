import { Router } from 'express';
import user from './userRoutes';

const router = Router();

router.use('/user', user);

export default router;
