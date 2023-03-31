import express from 'express';
import { signup, login, isLoggedIn } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(isLoggedIn);
router.get('/logged', (req, res) => {
  res.send('WELKAM');
});

export { router };
