import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { faker } from '@faker-js/faker';

interface RegionPhoneData {
  countryCode: CountryCode;
  prefix: string;
  numberLength: number;
}

const regionPhoneData: { [key: string]: RegionPhoneData } = {
  us: { countryCode: 'US', prefix: '202555', numberLength: 4 },
  pl: { countryCode: 'PL', prefix: '601', numberLength: 6 },
  uz: { countryCode: 'UZ', prefix: '91', numberLength: 7 },
};

export function generatePhone(region: string): string {
  const regionData = regionPhoneData[region];
  if (!regionData) {
    return 'Invalid region';
  }

  const randomNumber =
    regionData.prefix + faker.string.numeric(regionData.numberLength);
  const phoneNumber = parsePhoneNumberFromString(
    randomNumber,
    regionData.countryCode
  );

  const international = faker.helpers.arrayElement([true, false]);

  return phoneNumber
    ? international
      ? phoneNumber.formatInternational()
      : phoneNumber.formatNational()
    : 'Invalid number';
}
