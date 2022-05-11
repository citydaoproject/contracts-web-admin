import { css } from '@emotion/react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';

interface ClippedDrawerProps extends Omit<DrawerProps, 'variant' | 'classes'> {}

const ClippedDrawer = ({ children, ...rest }: ClippedDrawerProps) => {
  const theme = useTheme();

  const transition = theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  return (
    <Drawer
      {...rest}
      variant="permanent"
      css={css`
        & .MuiDrawer-paper {
          position: relative;
          white-space: nowrap;
          overflow-x: hidden;
          transition: ${transition};
          width: ${theme.spacing(7)};

          ${theme.breakpoints.up('sm')} {
            width: ${theme.spacing(24)};
          }
        }
      `}
    >
      <div
        css={css`
          min-height: ${theme.mixins.toolbar.minHeight}px;
        `}
      />
      {children}
    </Drawer>
  );
};
export default ClippedDrawer;
