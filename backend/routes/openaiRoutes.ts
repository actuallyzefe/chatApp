import express from 'express';
import { checkUser } from '../middlewares/checkUser';
import { generateImage, aiChat } from '../utils/openai';
const router = express.Router();

router.use(checkUser);
router.post('/aichat', aiChat);
router.post('/aiimage', generateImage);

export { router as ai };
