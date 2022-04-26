import { css } from '@emotion/react';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const PageBarDivider = () => {
  const theme = useTheme();
  const margin = theme.spacing(1);
  return (
    <Divider
      orientation="vertical"
      flexItem
      css={css`
        margin-left: ${margin};
        margin-right: ${margin};
      `}
    />
  );
};
export default PageBarDivider;
