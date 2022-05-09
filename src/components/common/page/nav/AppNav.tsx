import List from '@mui/material/List';
import React from 'react';
import RoleIcon from '../../../access/RoleIcon';
import ContractIcon from '../../../contracts/ContractIcon';
import DeployIcon from '../../../contracts/DeployIcon';
import MerkleTreeIcon from '../../../merkle/MerkleTreeIcon';
import HomeIcon from '../../icons/HomeIcon';
import {
  contractsPath,
  deployPath,
  homePath,
  merkleTreesPath,
  newMerkleTreesPath,
  rolesBasePath,
} from '../../routes/paths';

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
      <NavItem title="Contracts" icon={ContractIcon} path={contractsPath} disabled={disabled} />
      <NavItem title="Merkle Trees" icon={MerkleTreeIcon} path={merkleTreesPath} disabled={disabled} />
      <NavItem title="New Merkle Tree" icon={MerkleTreeIcon} path={newMerkleTreesPath} child disabled={disabled} />
      <NavItem title="Roles" icon={RoleIcon} path={`${rolesBasePath}/*`} disabled={disabled} hideInactive />
    </List>
  </ClippedDrawer>
);
export default AppNav;
