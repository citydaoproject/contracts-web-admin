import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import React from 'react';
import { DefaultTextFieldProps } from './DefaultTextField';

type NumberFieldProps = DefaultTextFieldProps & {
  min?: number;
  max?: number;
};

const NumberField = ({ type, min, max, InputProps, ...rest }: NumberFieldProps) => {
  const { inputProps, ...restInputProps } = { ...InputProps };

  return (
    <TextField
      {...rest}
      css={css`
        & .muiinputbase-input {
          text-align: right;
        }
      `}
      type={type || 'number'}
      InputProps={{
        ...restInputProps,
        inputProps: { ...inputProps, min, max },
      }}
    />
  );
};
export default NumberField;
