import { css } from '@emotion/react';
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const DetailField = (props: BoxProps) => {
  const theme = useTheme();
  const boxPadding = theme.spacing(1);
  return (
    <Box
      {...props}
      css={css`
        padding-top: ${boxPadding};
        padding-bottom: ${boxPadding};
      `}
    />
  );
};
export default DetailField;
