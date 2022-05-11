import { css } from '@emotion/react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import React from 'react';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//     },
//   }),
// );

export interface ClippingAppBarProps extends AppBarProps {}

const ClippingAppBar = ({ children, position, ...rest }: ClippingAppBarProps) => {
  // const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar
      {...rest}
      position={position || 'absolute'}
      css={css`
        z-index: ${theme.zIndex.drawer + 1};
      `}
    >
      {children}
    </AppBar>
  );
};
export default ClippingAppBar;
