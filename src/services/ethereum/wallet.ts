import { connectEthereumProvider, getEthereumProvider, isProviderInstalled } from './provider';

export interface ConnectWalletOptions {
  forceReconnect?: boolean | null;
}

export const connectWallet = async ({ forceReconnect }: ConnectWalletOptions = {}): Promise<string> => {
  const provider = await connectEthereumProvider(forceReconnect || false);
  const signer = provider.getSigner();
  return signer.getAddress();
};

export const getConnectedWalletAddress = async (): Promise<string | null> => {
  const provider = getEthereumProvider();
  if (!provider) {
    return null;
  }

  const signer = provider.getSigner();
  return signer.getAddress();
};

export enum WalletStatus {
  Uninstalled = 'Uninstalled',
  Installed = 'Installed',
  Connected = 'Connected',
}

export const getWalletStatus = (): WalletStatus => {
  if (!isProviderInstalled()) {
    return WalletStatus.Uninstalled;
  }

  if (getEthereumProvider()) {
    return WalletStatus.Connected;
  }

  return WalletStatus.Installed;
};
