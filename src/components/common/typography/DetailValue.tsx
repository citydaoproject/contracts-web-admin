import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

const DetailValue = ({ variant, ...rest }: TypographyProps<'div'>) => (
  <Typography {...rest} variant={variant || 'body1'} component="div" />
);
export default DetailValue;
