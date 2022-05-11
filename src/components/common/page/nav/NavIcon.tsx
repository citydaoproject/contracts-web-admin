import { css } from '@emotion/react';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

const StyledListItemIcon = (props: ListItemIconProps) => (
  <ListItemIcon
    {...props}
    css={css`
      && {
        margin-right: 0;
        min-width: 44px;
      }
    `}
  />
);

const SelectedListItemIcon = (props: ListItemIconProps) => {
  const theme = useTheme();

  return (
    <StyledListItemIcon
      {...props}
      css={css`
        && {
          color: ${theme.palette.primary.main};
        }
      `}
    />
  );
};

interface NavIconProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  child?: boolean;
  selected?: boolean;
}

const NavIcon = ({ icon: Icon, title, child, selected }: NavIconProps) => {
  return (
    <Tooltip title={<>{title}</>}>
      <>
        {selected ? (
          <SelectedListItemIcon>
            <Icon fontSize={child ? 'small' : 'inherit'} />
          </SelectedListItemIcon>
        ) : (
          <StyledListItemIcon>
            <Icon fontSize={child ? 'small' : 'inherit'} />
          </StyledListItemIcon>
        )}
      </>
    </Tooltip>
  );
};
export default NavIcon;
