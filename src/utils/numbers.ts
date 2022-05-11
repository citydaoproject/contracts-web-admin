export const isPositiveNumber = (num?: number) =>
  num !== undefined && num !== null && !isNaN(num) && isFinite(num) && num > 0;

export const isPositiveNumberOrZero = (num?: number) =>
  num !== undefined && num !== null && !isNaN(num) && isFinite(num) && num >= 0;
