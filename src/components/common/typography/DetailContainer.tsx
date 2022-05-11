import { css } from '@emotion/react';
import Container, { ContainerProps } from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const DetailContainer = ({ maxWidth, children, ...rest }: ContainerProps) => {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      css={css`
        @media (min-width: 600px) {
          padding-bottom: ${theme.spacing(2)};
        }

        padding-bottom: ${theme.spacing(1)};
      `}
      maxWidth={maxWidth || false}
      children={children}
    />
  );
};
export default DetailContainer;
