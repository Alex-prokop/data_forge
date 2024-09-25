export function addErrors(record: any, errorCount: number): void {
  ['name', 'address', 'phone'].forEach((field) => {
    let value = record[field];
    if (!value) return;

    for (let i = 0; i < Math.floor(errorCount); i++) {
      value = applyRandomError(value);
    }

    if (Math.random() < errorCount % 1) {
      value = applyRandomError(value);
    }

    record[field] = value;
  });
}

function applyRandomError(str: string): string {
  const errorType = Math.floor(Math.random() * 3);
  switch (errorType) {
    case 0:
      return deleteRandomChar(str);
    case 1:
      return addRandomChar(str);
    case 2:
      return swapAdjacentChars(str);
    default:
      return str;
  }
}

function deleteRandomChar(str: string): string {
  const index = Math.floor(Math.random() * str.length);
  return str.slice(0, index) + str.slice(index + 1);
}

function addRandomChar(str: string): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
  const index = Math.floor(Math.random() * (str.length + 1));
  return str.slice(0, index) + randomChar + str.slice(index);
}

function swapAdjacentChars(str: string): string {
  if (str.length < 2) return str;
  const index = Math.floor(Math.random() * (str.length - 1));
  return (
    str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
  );
}
