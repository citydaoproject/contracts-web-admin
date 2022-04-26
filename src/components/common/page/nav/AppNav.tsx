import List from '@mui/material/List';
import React from 'react';
import DeployIcon from '../../actions/DeployIcon';
import HomeIcon from '../../icons/HomeIcon';
import { deployPath, homePath } from '../../routes/paths';

import ClippedDrawer from './ClippedDrawer';
import NavItem from './NavItem';

interface AppNavProps {
  disabled?: boolean;
}

const AppNav = ({ disabled }: AppNavProps) => (
  <ClippedDrawer data-qa="app-nav">
    <List component="nav">
      <NavItem title="Home" icon={HomeIcon} path={homePath} disabled={disabled} />
      <NavItem title="Deploy" icon={DeployIcon} path={deployPath} disabled={disabled} />
    </List>
  </ClippedDrawer>
);
export default AppNav;
