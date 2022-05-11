import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

export interface PageLoaderProps extends TypographyProps<'div'> {}

const PageLoader = ({ variant, ...rest }: PageLoaderProps) => (
  <Typography {...rest} variant={variant || 'subtitle1'} component="div">
    Loading...
  </Typography>
);
export default PageLoader;
