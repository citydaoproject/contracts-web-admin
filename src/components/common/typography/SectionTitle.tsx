import { css } from '@emotion/react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

interface SectionTitleProps extends TypographyProps {}

const SectionTitle = ({ title, variant, ...rest }: SectionTitleProps) => (
  <div
    css={css`
      flex: 0 0 auto;
    `}
  >
    <Typography {...rest} variant={variant || 'h5'} />
  </div>
);
export default SectionTitle;
