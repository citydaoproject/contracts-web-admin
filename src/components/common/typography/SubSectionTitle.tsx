import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

export interface SubSectionTitleProps extends TypographyProps {}

const SubSectionTitle = ({ title, variant, style, ...rest }: SubSectionTitleProps) => {
  const theme = useTheme();
  return (
    <Typography
      {...rest}
      css={css`
        padding-bottom: ${theme.spacing(1)};
      `}
      variant={variant || 'h6'}
    />
  );
};
export default SubSectionTitle;
