import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import FillContent from '../containers/FillContent';

const PageContent = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const theme = useTheme();

  const topPadding = theme.breakpoints.up('sm') ? theme.spacing(11) : theme.spacing(9);
  const otherPadding = theme.spacing(3);

  return (
    <FillContent
      {...props}
      css={css`
        padding: ${topPadding} ${otherPadding} ${otherPadding} ${otherPadding};
        overflow: scroll;
      `}
    ></FillContent>
  );
};
export default PageContent;
