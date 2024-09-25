import { createObjectCsvWriter } from 'csv-writer';
import { Record } from '../types/types';

export async function exportToCsv(
  data: Record[],
  filePath: string
): Promise<void> {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'identifier', title: 'Identifier' },
      { id: 'name', title: 'Name' },
      { id: 'address', title: 'Address' },
      { id: 'phone', title: 'Phone' },
    ],
  });

  await csvWriter.writeRecords(data);
}
