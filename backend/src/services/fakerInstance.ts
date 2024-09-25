import { faker as fakerUS } from '@faker-js/faker/locale/en_US';
import { faker as fakerPL } from '@faker-js/faker/locale/pl';
import { faker as fakerUZ } from '@faker-js/faker/locale/uz_UZ_latin';

export interface FakerInstance {
  person: {
    fullName: () => string;
  };
  location: {
    streetAddress: () => string;
    city: () => string;
    state?: () => string;
    zipCode?: () => string;
    buildingNumber: () => string;
    secondaryAddress: () => string;
  };
  string: {
    uuid: () => string;
  };
  helpers: {
    arrayElement: <T>(array: T[]) => T;
  };
}

const fakerMap: { [key: string]: typeof fakerUS } = {
  us: fakerUS,
  pl: fakerPL,
  uz: fakerUZ,
};

export function getFakerInstance(
  region: string,
  seed: number = 42
): FakerInstance | null {
  const fakerInstance = fakerMap[region];

  if (fakerInstance) {
    fakerInstance.seed(seed);
    return fakerInstance as FakerInstance;
  }

  return null;
}
