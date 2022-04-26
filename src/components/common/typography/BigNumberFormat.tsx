import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

export type BigNumberFormatProps = Omit<NumberFormatProps, 'value' | 'thousandSeparator'> & {
  amount?: number | string | null;
  displayType?: 'text' | 'input';
  automaticDecimalScale?: boolean;
};

const BigNumberFormat = ({
  amount,
  displayType,
  decimalScale,
  automaticDecimalScale,
  ...rest
}: BigNumberFormatProps) => {
  const scale =
    automaticDecimalScale && amount !== undefined && amount !== null
      ? computeDecimalScale(amount)
      : decimalScale === undefined || decimalScale === null
      ? 2
      : decimalScale;
  return (
    <NumberFormat
      {...rest}
      decimalScale={scale}
      displayType={displayType || 'text'}
      thousandSeparator={true}
      value={amount !== null ? amount : undefined}
    />
  );
};
export default BigNumberFormat;

export const computeDecimalScale = (amount: number | string) => {
  const amountValue = typeof amount === 'number' ? amount : parseFloat(amount);
  return amountValue === 0
    ? 2
    : amountValue < 0.0001
    ? 6
    : amountValue < 0.001
    ? 5
    : amountValue < 0.01
    ? 4
    : amountValue < 0.1
    ? 3
    : 2;
};
