import { Router } from 'express';
import { getSession, login, logout } from '../controllers/authController.js';

const router = Router();

router.get('/auth/login', login);
router.get('/auth/session', getSession);
router.post('/logout', logout);

export default router;
