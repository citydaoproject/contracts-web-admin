import React from 'react';
import { buildConnectWalletText, useWallet } from '../../hooks/wallet';
import LoaderButton, { LoaderButtonProps } from '../common/forms/LoaderButton';

export interface ConnectWalletButtonProps extends Omit<LoaderButtonProps, 'onClick' | 'loading' | 'children'> {
  onConnectWallet?: (address: string) => void;
}

const ConnectWalletButton = ({ onConnectWallet, ...rest }: ConnectWalletButtonProps) => {
  const { walletStatus, connect, connecting } = useWallet({ forceReconnect: true });

  const handleConnectWallet = async () => {
    const address = await connect();
    if (address && onConnectWallet) {
      onConnectWallet(address);
    }
  };

  return (
    <LoaderButton {...rest} loading={connecting} onClick={handleConnectWallet}>
      {buildConnectWalletText(walletStatus)}
    </LoaderButton>
  );
};
export default ConnectWalletButton;
