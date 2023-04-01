import express from 'express';
import { signup, login, logout } from '../controllers/authController';
import { checkUser } from '../middlewares/checkUser';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(checkUser);
router.get('/logout', logout);

export { router as auth };
