import { Contract, ContractFactory, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { getEthereumProvider, getEthereumSigner } from './provider';
import { ContractAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';

export type FactoryContract<F extends ContractFactory> = Contract & Awaited<ReturnType<F['deploy']>>;

export const attachContract = <F extends ContractFactory, C extends FactoryContract<F>>(
  factory: F,
  address: ContractAddress | null,
): C | null => {
  if (!address) {
    return null;
  }

  const contract = factory.attach(address);
  const signer = getEthereumSigner();
  if (signer) {
    return contract.connect(signer) as C;
  }

  const provider = getEthereumProvider();
  if (provider) {
    return contract.connect(provider) as C;
  }

  return null;
};

export type InterfaceFactoryConnector<C extends Contract> = (address: string, provider: Signer | Provider) => C;

export const attachInterface = <C extends Contract>(
  connect: InterfaceFactoryConnector<C>,
  address: ContractAddress | null,
): C | null => {
  if (!address) {
    return null;
  }

  const signer = getEthereumSigner();
  if (signer) {
    return connect(address, signer) as C;
  }

  const provider = getEthereumProvider();
  if (provider) {
    return connect(address, provider) as C;
  }

  return null;
};
