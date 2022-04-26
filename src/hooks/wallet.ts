import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { WalletDetails, walletState } from '../data/wallet';
import { getNativeCurrencyBalance } from '../services/ethereum/balances';
import { getRequiredNetwork, switchEthereumNetwork } from '../services/ethereum/provider';
import { connectWallet, getWalletStatus, WalletStatus } from '../services/ethereum/wallet';

export interface WalletHookOptions {
  autoConnect?: boolean;
  forceReconnect?: boolean;
}

export interface WalletInfo {
  walletStatus: WalletStatus;
  wallet: WalletDetails | null;
  connecting: boolean;
  connect: (options?: ConnectNetworkOptions) => Promise<string>;
  switchNetwork: (chainId: number) => Promise<boolean>;
}

export interface ConnectNetworkOptions {
  forceReconnect?: boolean;
}

export const useWallet = ({ autoConnect, forceReconnect }: WalletHookOptions = {}): WalletInfo => {
  const [walletStateData, setWalletState] = useRecoilState(walletState);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (walletStateData.walletStatus === WalletStatus.Uninstalled) {
      const newWalletStatus = getWalletStatus();

      if (newWalletStatus === WalletStatus.Connected) {
        // if connected, need to fetch the detailed wallet info

        // noinspection JSIgnoredPromiseFromCall
        connect({ forceReconnect: false });
      } else {
        // if not connected, then just update to the current status
        setWalletState({ ...walletStateData, walletStatus: newWalletStatus });
      }
    }
  }, []);

  useEffect(() => {
    if (autoConnect && walletStateData.walletStatus === WalletStatus.Installed) {
      // noinspection JSIgnoredPromiseFromCall
      connect();
    }
  }, [autoConnect, walletStateData.walletStatus]);

  const connect = async ({ forceReconnect: forceReconnectOverride }: ConnectNetworkOptions = {}): Promise<string> => {
    setConnecting(true);
    try {
      const address = await connectWallet({
        forceReconnect: forceReconnectOverride !== undefined ? forceReconnectOverride : forceReconnect || false,
      });

      const [network, nativeCurrencyBalance] = await Promise.all([
        getRequiredNetwork(),
        getNativeCurrencyBalance(address),
      ]);

      setWalletState({
        walletStatus: WalletStatus.Connected,
        wallet: {
          address,
          network,
          nativeCurrencyBalance,
        },
      });

      return address;
    } finally {
      setConnecting(false);
    }
  };

  const switchNetwork = async (chainId: number): Promise<boolean> => {
    setConnecting(true);
    try {
      const result = await switchEthereumNetwork(chainId);

      if (result) {
        await connect({ forceReconnect: false });
      }

      return result;
    } finally {
      setConnecting(false);
    }
  };

  const gotoMetamask = () => {
    window.open('https://metamask.io/', '_blank');
  };

  if (!walletStateData || walletStateData.walletStatus == WalletStatus.Uninstalled) {
    return {
      walletStatus: WalletStatus.Uninstalled,
      wallet: null,
      connecting,
      connect: async () => {
        gotoMetamask();
        return '';
      },
      switchNetwork: async () => {
        gotoMetamask();
        return false;
      },
    };
  }

  const { walletStatus, wallet } = walletStateData;

  return {
    walletStatus,
    wallet,
    connect,
    connecting,
    switchNetwork,
  };
};

export const buildConnectWalletText = (walletStatus: WalletStatus) => {
  switch (walletStatus) {
    case WalletStatus.Uninstalled:
      return 'Install MetaMask';

    case WalletStatus.Installed:
      return 'Connect Wallet';

    case WalletStatus.Connected:
      return 'Reconnect Wallet';
  }

  return `Invalid wallet status: ${walletStatus}`;
};
