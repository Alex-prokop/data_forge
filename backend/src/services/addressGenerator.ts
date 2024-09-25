import { FakerInstance } from './fakerInstance';

interface AddressFormatter {
  formatAddress(fakerInstance: FakerInstance): string;
}

class USAddressFormatter implements AddressFormatter {
  formatAddress(fakerInstance: FakerInstance): string {
    return fakerInstance.helpers.arrayElement([
      `${getStreetAddress(fakerInstance)}, ${getCity(
        fakerInstance
      )}, ${getState(fakerInstance)} ${getZipCode(fakerInstance)}`,
      `${getStreetAddress(fakerInstance)}, ${getCity(
        fakerInstance
      )}, ${getZipCode(fakerInstance)}`,
      `${getStreetAddress(fakerInstance)}, ${getCity(fakerInstance)}`,
      `${getCity(fakerInstance)}, ${getState(fakerInstance)}`,
    ]);
  }
}

class PLAddressFormatter implements AddressFormatter {
  formatAddress(fakerInstance: FakerInstance): string {
    return fakerInstance.helpers.arrayElement([
      `${getStreetAddress(fakerInstance)}, ${getZipCode(
        fakerInstance
      )} ${getCity(fakerInstance)}`,
      `${getCity(fakerInstance)}, ${getZipCode(fakerInstance)}`,
      `${getStreetAddress(fakerInstance)}, ${getCity(fakerInstance)}`,
    ]);
  }
}

class UZAddressFormatter implements AddressFormatter {
  formatAddress(fakerInstance: FakerInstance): string {
    return fakerInstance.helpers.arrayElement([
      `${getState(fakerInstance)} viloyati, ${getCity(
        fakerInstance
      )}, ${getStreetAddress(fakerInstance)} ko'chasi, ${getBuildingNumber(
        fakerInstance
      )}-uy`,
      `${getCity(fakerInstance)}, ${getStreetAddress(
        fakerInstance
      )} ko'chasi, ${getBuildingNumber(fakerInstance)}-uy`,
      `${getState(fakerInstance)} viloyati, ${getCity(
        fakerInstance
      )}, ${getStreetAddress(fakerInstance)} ko'chasi, ${getBuildingNumber(
        fakerInstance
      )}-uy`,
    ]);
  }
}

const addressFormatters: { [key: string]: AddressFormatter } = {
  us: new USAddressFormatter(),
  pl: new PLAddressFormatter(),
  uz: new UZAddressFormatter(),
};

export function generateAddress(
  fakerInstance: FakerInstance,
  region: string
): string {
  const formatter = addressFormatters[region];
  return formatter ? formatter.formatAddress(fakerInstance) : '';
}

function getStreetAddress(fakerInstance: FakerInstance): string {
  return fakerInstance.location.streetAddress();
}

function getCity(fakerInstance: FakerInstance): string {
  return fakerInstance.location.city();
}

function getState(fakerInstance: FakerInstance): string {
  return fakerInstance.location.state ? fakerInstance.location.state() : '';
}

function getZipCode(fakerInstance: FakerInstance): string {
  return fakerInstance.location.zipCode ? fakerInstance.location.zipCode() : '';
}

function getBuildingNumber(fakerInstance: FakerInstance): string {
  return fakerInstance.location.buildingNumber();
}
