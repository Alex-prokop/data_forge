import express, { Request, Response } from 'express';
import cors from 'cors';
import { getData, exportData } from './controllers/dataController';

const app = express();

// Настройка CORS
const corsOptions = {
  origin: 'https://dataforge-production.up.railway.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/data', getData);
app.get('/export', exportData);

export default app;
