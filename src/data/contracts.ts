import { buildLocalStorageKey, clearLocalStorage, getLocalStorage, setLocalStorage } from '../utils/localStorage';

export interface LogicContractInfo {
  networkName: string;
  type: string;
  address: string;
}

export const findLogicContractByType = (networkName: string, type: string): LogicContractInfo | null =>
  getLocalStorage(buildLogicContractStorageKey(networkName, type));

export const updateLogicContract = (logicContract: LogicContractInfo): void => {
  setLocalStorage(buildLogicContractStorageKey(logicContract.networkName, logicContract.type), logicContract);
};

export const clearLogicContract = (networkName: string, type: string): void => {
  clearLocalStorage(buildLogicContractStorageKey(networkName, type));
};

const buildLogicContractStorageKey = (networkName: string, type: string): string =>
  buildLocalStorageKey('logicContract', buildLocalStorageKey(networkName.toString(), type));
