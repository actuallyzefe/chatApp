import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

export { app };
