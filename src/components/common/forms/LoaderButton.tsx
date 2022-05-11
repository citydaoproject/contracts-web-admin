import { ButtonProps } from '@mui/material/Button';
import React from 'react';
import DefaultButton from './DefaultButton';

export type LoaderButtonProps = ButtonProps & {
  loading?: boolean;
};

const LoaderButton = ({ loading, disabled, ...rest }: LoaderButtonProps) => (
  <DefaultButton {...rest} disabled={disabled || loading} />
);
export default LoaderButton;
