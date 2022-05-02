import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import { ContractFactory } from 'ethers';
import { requireNotNull } from '../../utils/check';
import {
  parcelManagerRoleDescription,
  pauserRoleDescription,
  RoleDescription,
  superAdminRoleDescription,
  upgraderRoleDescription,
} from '../access/roles';

export interface LogicContractDefinition {
  type: LogicContractType;
  factory: () => ContractFactory;
  roles: RoleDescription[];
}

export enum LogicContractType {
  ParcelNFT = 'ParcelNFT',
}

export const logicContractDefinitions: readonly LogicContractDefinition[] = [
  {
    type: LogicContractType.ParcelNFT,
    factory: () => new ParcelNFT__factory(),
    roles: [superAdminRoleDescription, parcelManagerRoleDescription, pauserRoleDescription, upgraderRoleDescription],
  },
];

export const getLogicContractDefinition = (type: LogicContractType): LogicContractDefinition =>
  requireNotNull(findLogicContractDefinition(type), `Logic contract definition not found for type ${type}`);

export const findLogicContractDefinition = (type: LogicContractType): LogicContractDefinition | undefined =>
  logicContractDefinitions.find((contractDefinition) => contractDefinition.type === type);
