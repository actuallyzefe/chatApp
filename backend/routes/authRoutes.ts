import express from 'express';
import { signup, signin, signOut } from '../controllers/authController';
import { checkUser } from '../middlewares/checkUser';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);

router.use(checkUser);
router.get('/logout', signOut);

export { router as auth };
