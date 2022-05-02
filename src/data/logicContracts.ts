import memoize from 'fast-memoize';
import { atom, DefaultValue, selector } from 'recoil';
import { LogicContractType } from '../components/contracts/logicContracts';
import { buildLocalStorageKey, getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage';
import { cloneMap } from '../utils/map';
import { networkNameState } from './wallet';

export interface LogicContractInfo {
  networkName: string;
  type: LogicContractType;
  address: string;
}

const logicContractsState = atom({
  key: 'logicContracts',
  default: new Map<string, LogicContractInfo>(),
});

export const getNetworkLogicContractSelector = memoize((type: LogicContractType) => {
  const buildMapKey = (networkName: string) => buildLocalStorageKey(networkName, type);

  return selector<LogicContractInfo | null>({
    key: buildLocalStorageKey('logicContracts', type),
    get: ({ get }) => {
      const networkName = get(networkNameState);
      if (!networkName) {
        return null;
      }
      return get(logicContractsState).get(buildMapKey(networkName)) || findLogicContractByType(networkName, type);
    },
    set: ({ get, set }, newValue) => {
      const networkName = get(networkNameState);
      if (!networkName) {
        return;
      }

      const logicContracts = cloneMap(get(logicContractsState));
      if (newValue instanceof DefaultValue || newValue === null) {
        removeLogicContract(networkName, type);
        logicContracts.delete(buildLocalStorageKey(networkName, type));
        set(logicContractsState, logicContracts);
        return;
      }

      updateLogicContract(newValue);
      logicContracts.set(buildLocalStorageKey(networkName, type), newValue);
      set(logicContractsState, logicContracts);
    },
  });
});

const findLogicContractByType = (networkName: string, type: LogicContractType): LogicContractInfo | null =>
  getLocalStorage(buildLogicContractStorageKey(networkName, type));

const updateLogicContract = (logicContract: LogicContractInfo): void => {
  setLocalStorage(buildLogicContractStorageKey(logicContract.networkName, logicContract.type), logicContract);
};

const removeLogicContract = (networkName: string, type: LogicContractType): void => {
  removeLocalStorage(buildLogicContractStorageKey(networkName, type));
};

const buildLogicContractStorageKey = (networkName: string, type: LogicContractType): string =>
  buildLocalStorageKey('logicContract', buildLocalStorageKey(networkName, type));
