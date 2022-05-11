import { css } from '@emotion/react';
import React from 'react';

const FullPage = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    css={css`
      display: flex;
      flex-grow: 1;
      height: 100vh;
      width: 100vw;
    `}
  ></div>
);
export default FullPage;
