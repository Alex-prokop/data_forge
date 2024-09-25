import { getFakerInstance, FakerInstance } from './fakerInstance';
import { generateAddress } from './addressGenerator';
import { generatePhone } from './phoneGenerator';
import { addErrors } from './errorHandler';
import { Record } from '../types/types';
import {
  INITIAL_RECORDS_PER_PAGE,
  RECORDS_PER_PAGE,
} from '../config/constants';

const getRecordsPerPage = (isInitialLoad: boolean): number =>
  isInitialLoad ? INITIAL_RECORDS_PER_PAGE : RECORDS_PER_PAGE;

const calculateStartId = (page: number, isInitialLoad: boolean): number => {
  if (isInitialLoad) {
    return (page - 1) * INITIAL_RECORDS_PER_PAGE + 1;
  } else {
    return INITIAL_RECORDS_PER_PAGE + (page - 2) * RECORDS_PER_PAGE + 1;
  }
};

const createRecord = (
  fakerInstance: FakerInstance,
  id: number,
  region: string
): Record => ({
  id,
  identifier: fakerInstance.string.uuid(),
  name: fakerInstance.person.fullName(),
  address: generateAddress(fakerInstance, region),
  phone: generatePhone(region),
});

export function generateData(
  seed: number,
  page: number,
  region: string,
  errors: number,
  isInitialLoad: boolean
): Record[] {
  const fakerInstance = getFakerInstance(region, seed + page);
  if (!fakerInstance) {
    throw new Error(`Region ${region} is not supported.`);
  }

  const recordsPerPage = getRecordsPerPage(isInitialLoad);
  const startId = calculateStartId(page, isInitialLoad);

  return Array.from({ length: recordsPerPage }, (_, index) => {
    const record = createRecord(fakerInstance, startId + index, region);

    if (errors > 0) {
      addErrors(record, errors);
    }

    return record;
  });
}
