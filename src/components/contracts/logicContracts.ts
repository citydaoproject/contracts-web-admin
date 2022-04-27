import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import { ContractFactory } from 'ethers';

export interface LogicContractDefinition {
  type: string;
  factory: () => ContractFactory;
}

export const logicContractDefinitions: readonly LogicContractDefinition[] = [
  {
    type: 'ParcelNFT',
    factory: () => new ParcelNFT__factory(),
  },
];

export const findLogicContractDefinition = (type: string): LogicContractDefinition | undefined =>
  logicContractDefinitions.find((contractDefinition) => contractDefinition.type === type);
