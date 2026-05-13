import { Router } from 'express';
import { login, logout } from '../controllers/authController.js';

const router = Router();

router.get('/auth/login', login);
router.post('/logout', logout);

export default router;
