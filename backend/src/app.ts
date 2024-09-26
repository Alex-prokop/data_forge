import express, { Request, Response } from 'express';
import cors from 'cors';
import { getData, exportData } from './controllers/dataController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/data', getData);
app.get('/export', exportData);

export default app;
