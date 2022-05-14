import { ContractAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';
import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import { defaultParcelNFTInitParams } from '@citydao/parcel-contracts/dist/src/contracts/parcelNFT';
import { TransactionRequest } from '@ethersproject/abstract-provider';

export const buildParcelNFTInitializationFunction = async (address: ContractAddress): Promise<TransactionRequest> =>
  new ParcelNFT__factory().attach(address).populateTransaction.initialize(defaultParcelNFTInitParams);
