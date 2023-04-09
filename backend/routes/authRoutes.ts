import express from 'express';
import { signup, signin, signOut } from '../controllers/authController';
import { updateMe } from '../controllers/userController';
import { checkUser } from '../middlewares/checkUser';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);

router.use(checkUser);
router.get('/logout', signOut);
router.patch('/updateme', updateMe);
export { router as auth };
