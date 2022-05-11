import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface NavItemTextProps {
  title: string;
  child?: boolean;
}

const NavItemText = ({ title, child }: NavItemTextProps) => (
  <Tooltip title={title}>
    <ListItemText
      primary={!child ? title || <>&nbsp;</> : undefined}
      primaryTypographyProps={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      secondary={child ? title || <>&nbsp;</> : undefined}
      secondaryTypographyProps={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    />
  </Tooltip>
);
export default NavItemText;
