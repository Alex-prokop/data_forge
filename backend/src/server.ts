import express, { Request, Response } from 'express';
import cors from 'cors';
import { getData, exportData } from './controllers/dataController';

const app = express();

// Настройка CORS без указания origin
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigins = [
      'https://dataforge-production.up.railway.app',
      'http://localhost:3000',
    ]; // Добавьте ваши разрешенные домены

    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/data', getData);
app.get('/export', exportData);

export default app;
