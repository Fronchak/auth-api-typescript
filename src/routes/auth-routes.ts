import { Router } from 'express';
import resolver from './controller-adapter';
import authController from '../controllers/auth-controller';

const authRoutes = Router();

authRoutes.post('/register', resolver(authController.register));
authRoutes.post('/login', resolver(authController.login));

export default authRoutes;