import { Request, Response } from 'express';
import { generateData } from '../services/dataGenerator';
import { exportToCsv } from '../services/csvExporter';
import {
  DEFAULT_SEED_VALUE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_REGION,
  DEFAULT_ERROR_COUNT,
  INITIAL_PAGE_NUMBER,
} from '../config/constants';

const validatePageAndSeed = (
  seed: string | undefined,
  page: string | undefined
) => {
  const seedValue = seed ? parseInt(seed, 10) : DEFAULT_SEED_VALUE;
  const pageNumber = page ? parseInt(page, 10) : DEFAULT_PAGE_NUMBER;

  if (isNaN(seedValue) || isNaN(pageNumber) || pageNumber < 1) {
    throw new Error('Invalid seed or page number');
  }

  return { seedValue, pageNumber };
};

export const getData = (req: Request, res: Response) => {
  try {
    const { seedValue, pageNumber } = validatePageAndSeed(
      req.query.seed as string,
      req.query.page as string
    );
    const region = req.query.region
      ? (req.query.region as string)
      : DEFAULT_REGION;
    const errorCount = req.query.errors
      ? parseFloat(req.query.errors as string)
      : DEFAULT_ERROR_COUNT;

    console.log(
      `Request received: seed=${seedValue}, page=${pageNumber}, region=${region}, errors=${errorCount}`
    );

    const isInitialLoad = pageNumber === INITIAL_PAGE_NUMBER;

    const data = generateData(
      seedValue,
      pageNumber,
      region,
      errorCount,
      isInitialLoad
    );

    console.log('Generated data:', data);
    res.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing request:', error.message);
    } else {
      console.error('Error processing request:', error);
    }
    res.status(500).json({ error: 'Error generating data' });
  }
};

export const exportData = async (req: Request, res: Response) => {
  try {
    const { seedValue, pageNumber } = validatePageAndSeed(
      req.query.seed as string,
      req.query.page as string
    );
    const region = req.query.region
      ? (req.query.region as string)
      : DEFAULT_REGION;
    const errorCount = req.query.errors
      ? parseFloat(req.query.errors as string)
      : DEFAULT_ERROR_COUNT;

    console.log(
      `Export request: seed=${seedValue}, page=${pageNumber}, region=${region}, errors=${errorCount}`
    );

    const isInitialLoad = pageNumber === INITIAL_PAGE_NUMBER;

    const data = generateData(
      seedValue,
      pageNumber,
      region,
      errorCount,
      isInitialLoad
    );

    const filePath = 'data.csv';
    await exportToCsv(data, filePath);
    res.download(filePath);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error exporting CSV:', err.message);
    } else {
      console.error('Error exporting CSV:', err);
    }
    res.status(500).send('Error exporting data');
  }
};
