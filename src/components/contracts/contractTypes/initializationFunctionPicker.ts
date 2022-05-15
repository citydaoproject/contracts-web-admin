import { ContractAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { LogicContractType } from '../logicContracts';
import { buildParcelNFTInitializationFunction } from './parcelNFT/parcelNFTInitializationFunction';

export const getInitializationFunctionBuilder = (
  type: LogicContractType,
): ((address: ContractAddress) => Promise<TransactionRequest>) | undefined => {
  switch (type) {
    case LogicContractType.ParcelNFT:
      return buildParcelNFTInitializationFunction;
  }

  console.warn(`Unknown contract type: ${type}`);
  return undefined;
};
