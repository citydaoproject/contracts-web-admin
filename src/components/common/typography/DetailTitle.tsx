import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

const DetailTitle = ({ variant, children, ...rest }: TypographyProps) => (
  <Typography {...rest} variant={variant || 'subtitle1'}>
    <b>{children}:</b>
  </Typography>
);
export default DetailTitle;
