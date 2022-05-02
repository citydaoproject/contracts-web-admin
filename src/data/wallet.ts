import { atom, selector } from 'recoil';
import { EthereumNetwork } from '../services/ethereum/provider';
import { WalletStatus } from '../services/ethereum/wallet';

export interface WalletState {
  walletStatus: WalletStatus;
  wallet: WalletDetails | null;
}

export interface WalletDetails {
  address: string;
  network: EthereumNetwork;
  nativeCurrencyBalance: number;
}

export const walletState = atom<WalletState>({
  key: 'wallet',
  default: { walletStatus: WalletStatus.Uninstalled, wallet: null },
});

export const walletStatusState = selector<WalletStatus>({
  key: 'walletStatus',
  get: ({ get }): WalletStatus => get(walletState).walletStatus,
});

export const networkNameState = selector<string | null>({
  key: 'networkName',
  get: ({ get }): string | null => get(walletState).wallet?.network.key || null,
});
