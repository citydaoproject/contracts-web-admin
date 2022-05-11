import { atom, selector } from 'recoil';
import { EthereumNetwork, getAllNetworks } from '../services/ethereum/provider';

export interface EthereumNetworkState {
  networks: readonly EthereumNetwork[];
}

export const ethereumNetworkState = atom<EthereumNetworkState>({
  key: 'ethereumNetworkState',
  default: { networks: getAllNetworks() },
});

export const ethereumNetworksState = selector({
  key: 'ethereumNetworksState',
  get: ({ get }): readonly EthereumNetwork[] => get(ethereumNetworkState).networks,
});
