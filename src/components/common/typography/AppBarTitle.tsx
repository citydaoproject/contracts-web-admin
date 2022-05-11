import { css } from '@emotion/react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

export interface AppBarTitleProps extends TypographyProps {}

const AppBarTitle = ({ variant, color, ...rest }: AppBarTitleProps) => (
  <Typography
    {...rest}
    css={css`
      flex-grow: 1;
    `}
    variant={variant || 'h5'}
    color={color || 'inherit'}
  />
);

export default AppBarTitle;
