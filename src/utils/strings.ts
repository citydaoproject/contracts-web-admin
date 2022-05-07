import { isPositiveNumber, isPositiveNumberOrZero } from './numbers';

export const isBlank = (str?: string | null): boolean => !str || str.length === 0 || str.trim().length === 0;
export const isNotBlank = (str?: string | null): boolean => !isBlank(str);

export const trimToNull = (str?: string | null): string | null => (str ? str.trim() : null);

export const limitLength = (str: string | null | undefined, len: number): string =>
  str ? (str.length > len ? str.substring(0, len) + '...' : str) : '';

export const isTextPositiveInt = (str?: string | null): boolean =>
  str !== undefined && str !== null && !isBlank(str) && isPositiveNumber(parseInt(str, 10));

export const isTextPositiveFloat = (str?: string | null): boolean =>
  str !== undefined && str !== null && !isBlank(str) && isPositiveNumber(parseFloat(str));

export const isTextPositiveIntOrZero = (str?: string | null): boolean =>
  str !== undefined && str !== null && !isBlank(str) && isPositiveNumberOrZero(parseInt(str, 10));

export const isTextPositiveFloatOrZero = (str?: string | null): boolean =>
  str !== undefined && str !== null && !isBlank(str) && isPositiveNumberOrZero(parseFloat(str));
