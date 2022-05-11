import { css } from '@emotion/react';
import React from 'react';

const FillContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    css={css`
      flex-grow: 1;
    `}
  ></div>
);
export default FillContent;
