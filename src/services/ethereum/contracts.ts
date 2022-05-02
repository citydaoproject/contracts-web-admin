import { Contract, ContractFactory } from 'ethers';
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
