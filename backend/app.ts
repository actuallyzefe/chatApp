import express from 'express';
import cookieParser from 'cookie-parser';
import { auth } from './routes/authRoutes';
import { ai } from './routes/openaiRoutes';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);
app.use('/api/users', auth);
app.use('/api/ai', ai);

export { app };
