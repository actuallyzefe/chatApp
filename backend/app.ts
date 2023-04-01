import express from 'express';
import cookieParser from 'cookie-parser';
import { auth } from './routes/authRoutes';
import { ai } from './routes/openaiRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', auth);
app.use('/api/ai', ai);

export { app };
