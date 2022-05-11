import { Contract, ContractFactory, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { getEthereumProvider, getEthereumSigner } from './provider';

export type FactoryContract<F extends ContractFactory> = Contract & Awaited<ReturnType<F['deploy']>>;

export const attachContract = <F extends ContractFactory, C extends FactoryContract<F>>(
  factory: F,
  address: string,
): C => {
  const contract = factory.attach(address);
  const signer = getEthereumSigner();
  if (signer) {
    return contract.connect(signer) as C;
  }

  const provider = getEthereumProvider();
  if (provider) {
    return contract.connect(provider) as C;
  }

  return contract as C;
};

export type InterfaceFactoryConnector<C extends Contract> = (address: string, provider: Signer | Provider) => C;

export const attachInterface = <C extends Contract>(
  connect: InterfaceFactoryConnector<C>,
  address: string,
): C | null => {
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
