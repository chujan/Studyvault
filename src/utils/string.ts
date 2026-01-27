// src/utils/index.ts

// Utility to capitalize the first letter of a string
export function toUpperCaseFirstLetter(val: string): string {
  return val[0].toUpperCase() + val.substr(1);
}

// Check if an object is empty
export function isObjectEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

// Capitalize first letter and lowercase the rest
export function capitalizeFirstLetter(word: string): string {
  if (word.length === 0) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Mask a string (replace all but last 4 chars with 'X')
export const maskWord = (input: string): string => {
  if (typeof input !== 'string') return input;
  const masked = input.slice(0, -4).replace(/./g, 'X') + input.slice(-4);
  return masked.replace(new RegExp(`.{4}`, 'g'), '$& ');
};

// Convert local number to international format
export function convertToInternationalFormat(localNumber: string): string {
  if (/^0[789]\d{9}$/.test(localNumber)) {
    return '234' + localNumber.substring(1);
  }
  return 'Invalid input format';
}

// Convert international number to local format
export function convertToLocalFormat(internationalNumber: string): string {
  if (/^234[789]\d{9}$/.test(internationalNumber)) {
    return '0' + internationalNumber.substring(3);
  }
  return 'Invalid input format';
}

// Format number with commas and 2 decimal places
export function formatNumberWithCommas(input: number | null): string {
  if (input === null) return '0.00';
  return input.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Generate a location code from a location name
export function generateLocationCode(locationName: string): string {
  const firstWord = locationName?.split(' ')[0] || '';
  let code = '';
  for (const word of firstWord.split(' ')) {
    code += word.slice(0, 3).toUpperCase();
  }
  return code;
}

// Combine numbers from an array
export function combineNumbers(arr: (string | number)[]): number {
  const combinedString = arr.join('');
  return combinedString.includes('.') ? parseFloat(combinedString) : parseInt(combinedString);
}

// Transform rates object to array with origin, base, rate
export function transformRates(ratesObject: Record<string, number>) {
  const result: { origin: string; base: string; rate: number }[] = [];
  for (const key in ratesObject) {
    if (ratesObject.hasOwnProperty(key) && key.length === 6) {
      result.push({
        origin: key.substring(0, 3),
        base: key.substring(3),
        rate: ratesObject[key],
      });
    }
  }
  return result;
}

// Validate if string is a URL
export function isURL(str: string): boolean {
  const pattern =
    /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\w\-\._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return pattern.test(str);
}

// Calculate money percentages from data array
export type DataEntry = {
  money_in: string;
  money_out: string;
  difference: string;
};

export const calculatePercentages = (data: DataEntry[]) => {
  return data.map(entry => {
    const moneyIn = parseFloat(entry.money_in.replace(/[^0-9.-]+/g, ''));
    const moneyOut = parseFloat(entry.money_out.replace(/[^0-9.-]+/g, ''));
    const difference = parseFloat(entry.difference.replace(/[^0-9.-]+/g, ''));

    return {
      ...entry,
      money_out_percentage: ((moneyOut / moneyIn) * 100).toFixed(2) + '%',
      difference_percentage: ((difference / moneyIn) * 100).toFixed(2) + '%',
    };
  });
};

// Number formatter instance
export const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
