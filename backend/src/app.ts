import express from 'express';
import cors from 'cors';
import { getData, exportData } from './controllers/dataController';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // Разрешаем запросы только с вашего фронтенда
  })
);
app.use(express.json());

app.get('/data', getData);
app.get('/export', exportData);

export default app;
