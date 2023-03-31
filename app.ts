import express from 'express';
import { router } from './routes/authRoutes';

const app = express();

app.use(express.json());

app.use('/api', router);

export { app };
