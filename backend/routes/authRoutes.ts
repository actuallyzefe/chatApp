import express from 'express';
import {
  signup,
  signin,
  signOut,
  updateMe,
} from '../controllers/authController';
import { checkUser } from '../middlewares/checkUser';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);

router.use(checkUser);
router.get('/logout', signOut);
router.get('/updateme', updateMe);
export { router as auth };
