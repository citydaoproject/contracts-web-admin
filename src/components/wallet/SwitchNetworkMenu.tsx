import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { ethereumNetworksState } from '../../data/network';
import { useWallet } from '../../hooks/wallet';
import { EthereumNetwork } from '../../services/ethereum/provider';

export interface SwitchNetworkMenuProps {
  anchorEl: HTMLElement | null;
  allowedNetworks?: Set<string>;
  onClose?: () => void;
  onNetworkSwitched?: (network: EthereumNetwork) => void;
}

const SwitchNetworkMenu = ({ anchorEl, allowedNetworks, onClose, onNetworkSwitched }: SwitchNetworkMenuProps) => {
  const { switchNetwork } = useWallet();

  const ethereumNetworks = useRecoilValue(ethereumNetworksState);

  const handleSwitchNetwork = async (network: EthereumNetwork) => {
    if (onClose) {
      onClose();
    }

    await switchNetwork(network.chainId);

    if (onNetworkSwitched) {
      onNetworkSwitched(network);
    }
  };

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem disabled>Please select a network:</MenuItem>
      {ethereumNetworks.map((network) => (
        <MenuItem
          key={network.chainId}
          disabled={allowedNetworks && !allowedNetworks.has(network.key)}
          onClick={() => handleSwitchNetwork(network)}
        >
          {network.name}
        </MenuItem>
      ))}
    </Menu>
  );
};
export default SwitchNetworkMenu;
