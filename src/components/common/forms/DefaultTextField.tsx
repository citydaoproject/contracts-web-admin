import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import React from 'react';

export type DefaultTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & {
  readOnly?: boolean;
};

const DefaultTextField = ({ readOnly, InputProps, ...rest }: DefaultTextFieldProps) => (
  <TextField {...rest} InputProps={{ ...InputProps, readOnly }} />
);
export default DefaultTextField;
