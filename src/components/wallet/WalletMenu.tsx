import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { buildConnectWalletText, useWallet } from '../../hooks/wallet';
import TooltipItem from '../common/typography/TooltipItem';
import SwitchNetworkMenu from './SwitchNetworkMenu';
import WalletIcon from './WalletIcon';

const WalletMenu = () => {
  const { walletStatus, connect, connecting } = useWallet();

  const [mainAnchorEl, setMainAnchorEl] = useState<HTMLElement | null>(null);
  const [switchNetworkAnchorEl, setSwitchNetworkAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMainMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMainAnchorEl(event.currentTarget);
  };

  const closeMainMenu = () => {
    closeSwitchNetworkMenu();
    setMainAnchorEl(null);
  };

  const handleConnectNetwork = async () => {
    closeMainMenu();
    await connect({ forceReconnect: true });
  };

  const handleOpenSwitchEthereumMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    closeMainMenu();
    setSwitchNetworkAnchorEl(event.currentTarget);
  };

  const closeSwitchNetworkMenu = () => {
    setSwitchNetworkAnchorEl(null);
  };

  return (
    <>
      <TooltipItem title="Wallet">
        <IconButton color="inherit" onClick={handleOpenMainMenu}>
          <WalletIcon data-qa="wallet-menu" />
        </IconButton>
      </TooltipItem>
      <Menu anchorEl={mainAnchorEl} keepMounted open={Boolean(mainAnchorEl)} onClose={closeMainMenu}>
        <MenuItem disabled={connecting} onClick={handleConnectNetwork}>
          {buildConnectWalletText(walletStatus)}
        </MenuItem>
        <MenuItem disabled={connecting} onClick={handleOpenSwitchEthereumMenu}>
          Switch Ethereum Network
        </MenuItem>
      </Menu>
      <SwitchNetworkMenu anchorEl={switchNetworkAnchorEl} onClose={closeSwitchNetworkMenu} />
    </>
  );
};

export default WalletMenu;
