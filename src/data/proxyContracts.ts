import { atom, DefaultValue, selector } from 'recoil';
import { LogicContractType } from '../components/contracts/logicContracts';
import { buildLocalStorageKey, getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage';
import { cloneMap } from '../utils/map';
import { networkNameState } from './wallet';

export interface ProxyContractInfo {
  networkName: string;
  type: LogicContractType;
  address: string;
}

const proxyContractsState = atom({
  key: 'proxyContracts',
  default: new Map<string, ProxyContractInfo[]>(),
});

const buildNetworkProxySelectorKey = (networkName: string) => networkName;
export const networkProxyContractSelector = selector<ProxyContractInfo[]>({
  key: 'proxyContractsNetwork',
  get: ({ get }) => {
    const networkName = get(networkNameState);
    if (!networkName) {
      return [];
    }
    return get(proxyContractsState).get(buildNetworkProxySelectorKey(networkName)) || loadProxyContracts(networkName);
  },
  set: ({ get, set }, newValue) => {
    const networkName = get(networkNameState);
    if (!networkName) {
      return;
    }

    const proxyContracts = cloneMap(get(proxyContractsState));
    if (newValue instanceof DefaultValue || newValue === null) {
      removeProxyContracts(networkName);
      proxyContracts.delete(buildNetworkProxySelectorKey(networkName));
      set(proxyContractsState, proxyContracts);
      return;
    }

    updateProxyContracts(networkName, newValue);
    proxyContracts.set(buildNetworkProxySelectorKey(networkName), newValue);
    set(proxyContractsState, proxyContracts);
  },
});

const loadProxyContracts = (networkName: string): ProxyContractInfo[] =>
  getLocalStorage(buildProxyContractsStorageKey(networkName)) || [];

const updateProxyContracts = (networkName: string, proxyContracts: ProxyContractInfo[]): void => {
  setLocalStorage(buildProxyContractsStorageKey(networkName), proxyContracts);
};

const removeProxyContracts = (networkName: string): void => {
  removeLocalStorage(buildProxyContractsStorageKey(networkName));
};

const buildProxyContractsStorageKey = (networkName: string): string =>
  buildLocalStorageKey('proxyContracts', networkName);
