import { ethers } from 'ethers';
import { requireNotNull } from '../../utils/check';

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    readonly ethereum?: ethers.providers.ExternalProvider;
  }
}

let ethereumProvider: ethers.providers.Web3Provider | null = null;

export const isProviderInstalled = () => Boolean(window.ethereum);

export const getEthereumProvider = (): ethers.providers.Web3Provider | null => ethereumProvider;

export const connectEthereumProvider = async (forceReconnect?: boolean): Promise<ethers.providers.Web3Provider> => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask before continuing');
  }

  if (!ethereumProvider || forceReconnect) {
    ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
    const result = await ethereumProvider.send('eth_requestAccounts', []);
    console.debug('accounts:', result);
  }

  return ethereumProvider;
};

export const resetEthereumProvider = () => {
  ethereumProvider = null;
};

export interface EthereumNetwork {
  name: string;
  key: string;
  chainId: number;
  nativeCurrency: EthereumNetworkCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export interface EthereumNetworkCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

const ethereumCurrency = {
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
};

const knownEthereumNetworks: readonly EthereumNetwork[] = [
  {
    name: 'Ethereum Mainnet',
    key: 'mainnet',
    chainId: 1,
    nativeCurrency: ethereumCurrency,
    rpcUrls: [],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  {
    name: 'Rinkeby Test Network',
    key: 'rinkeby',
    chainId: 4,
    nativeCurrency: ethereumCurrency,
    rpcUrls: [],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
];

export const getAllNetworks = () => knownEthereumNetworks;

const findKnownNetworkByChainId = (networkChainId: number): EthereumNetwork | null =>
  knownEthereumNetworks.find(({ chainId }) => networkChainId === chainId) || null;

const findKnownNetworkByKey = (networkKey: string): EthereumNetwork | null =>
  knownEthereumNetworks.find(({ key }) => networkKey === key) || null;

export const getNetworkByKey = (key: string): EthereumNetwork =>
  requireNotNull(findKnownNetworkByKey(key), `Network not found by key: ${key}`);

export const getRequiredNetwork = async (): Promise<EthereumNetwork> =>
  requireNotNull(await getNetwork(), 'Not connected to ethereum network');

export const getNetwork = async (): Promise<EthereumNetwork | null> => {
  const provider = getEthereumProvider();
  if (!provider) {
    return null;
  }

  const network = await provider.getNetwork();
  if (!network || !network.chainId) {
    return null;
  }

  console.debug('network:', network);
  const ethereumNetwork = findKnownNetworkByChainId(network.chainId);

  return (
    ethereumNetwork || {
      nativeCurrency: ethereumCurrency,
      rpcUrls: [],
      blockExplorerUrls: [],
      key: network.name,
      ...network,
    }
  );
};

export const switchEthereumNetwork = async (chainId: number): Promise<boolean> => {
  const provider = await connectEthereumProvider();

  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: toChainIdHex(chainId) }]);
    await connectEthereumProvider(true);
    return true;
  } catch (e) {
    if (isUserRejectedError(e)) {
      return false;
    }

    if (isNetworkNotFoundError(e)) {
      if (await addEthereumChain(chainId)) {
        await connectEthereumProvider(true);
        return true;
      }
      return false;
    }

    throw e;
  }
};

const toChainIdHex = function (chainId: number) {
  return '0x' + chainId.toString(16);
};

export const addEthereumChain = async (chainId: number): Promise<boolean> => {
  const ethereumNetwork = findKnownNetworkByChainId(chainId);
  if (!ethereumNetwork) {
    return false;
  }

  const provider = await connectEthereumProvider();

  const network = {
    chainName: ethereumNetwork.name,
    chainId: toChainIdHex(ethereumNetwork.chainId),
    rpcUrls: ethereumNetwork.rpcUrls,
    blockExplorerUrls: ethereumNetwork.blockExplorerUrls,
    nativeCurrency: ethereumNetwork.nativeCurrency,
  };

  try {
    await provider.send('wallet_addEthereumChain', [network]);
    return true;
  } catch (e) {
    if (isUserRejectedError(e)) {
      return false;
    }
    throw e;
  }
};

export const isUserRejectedError = (e) => e.code === 4001;

export const isNetworkNotFoundError = (e) => e.code === 4902;

export const getEthereumSigner = (): ethers.providers.JsonRpcSigner | undefined => getEthereumProvider()?.getSigner();
