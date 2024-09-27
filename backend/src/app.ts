import express, { Request, Response } from 'express';
import cors from 'cors';
import { getData, exportData } from './controllers/dataController';

const app = express();
app.use(cors());
app.use(express.json());

// Маршрут для Healthcheck
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/data', getData);
app.get('/export', exportData);

export default app;
