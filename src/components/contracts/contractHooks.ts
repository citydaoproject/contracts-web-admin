import { ContractAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';
import { Provider } from '@ethersproject/providers';
import { Contract, ContractFactory, Signer } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useWallet } from '../../hooks/wallet';
import {
  attachContract,
  attachInterface,
  FactoryContract,
  InterfaceFactoryConnector,
} from '../../services/ethereum/contracts';
import { getEthereumProvider, getEthereumSigner } from '../../services/ethereum/provider';

export interface ContractLoaderHook<C extends Contract, K extends KeyOfGetterFunction<C>> {
  contract?: C;
  values?: ContractValues<C, K>;
  refetch: () => Promise<void>;
}

export type ContractValues<C extends Contract, K extends KeyOfGetterFunction<C>> = {
  [P in K]: Awaited<ReturnType<C[K]> | null>;
};

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any;
};

export type KeyOfGetterFunction<T> = KeyOfType<T, () => any>;

export const useContractLoader = <
  F extends ContractFactory,
  C extends FactoryContract<F>,
  K extends KeyOfGetterFunction<C>,
>(
  factory: F,
  address: ContractAddress | null,
  keys: K[] = [],
  onFetch?: (contract: C) => Promise<any>,
): ContractLoaderHook<C, K> => {
  const { wallet } = useWallet();

  const contract = useMemo(() => attachContract<F, C>(factory, address) || undefined, [address, wallet]);
  const [values, setValues] = useState<ContractValues<C, K>>();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchValues();
  }, [contract, address]);

  const fetchValues = async () => {
    if (!contract || !address) {
      setValues(undefined);
      return;
    }

    const [fetchedValues] = await Promise.all([fetchContractValues(contract, keys), onFetch?.(contract)]);

    setValues(fetchedValues);
  };

  return { contract, values, refetch: fetchValues };
};

export const useInterfaceLoader = <C extends Contract, K extends KeyOfGetterFunction<C>>(
  factory: InterfaceFactoryConnector<C>,
  address: ContractAddress | null,
  keys: K[] = [],
  onFetch?: (contract: C) => Promise<any>,
): ContractLoaderHook<C, K> => {
  const { wallet } = useWallet();

  const contract = useMemo(() => attachInterface<C>(factory, address || '') || undefined, [address, wallet]);
  const [values, setValues] = useState<ContractValues<C, K>>();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchValues();
  }, [contract, address]);

  const fetchValues = async () => {
    if (!contract || !address) {
      setValues(undefined);
      return;
    }

    const [fetchedValues] = await Promise.all([fetchContractValues(contract, keys), onFetch?.(contract)]);

    setValues(fetchedValues);
  };

  return { contract, values, refetch: fetchValues };
};

const fetchContractValues = async <C extends Contract, K extends KeyOfGetterFunction<C>>(
  contract: C,
  keys: K[],
): Promise<ContractValues<C, K>> => {
  const fetchedValues = await Promise.all(keys.map((key) => fetchContractValue(contract, key)));

  return fetchedValues.reduce((acc, fetchedValue, index) => {
    acc[keys[index]] = fetchedValue;
    return acc;
  }, {} as ContractValues<C, K>);
};

const fetchContractValue = async <C extends Contract, K extends KeyOfGetterFunction<C>>(
  contract: C,
  key: K,
): Promise<C[K] | null> => {
  try {
    console.debug(`Fetching ${key}`);
    return await contract[key]();
  } catch (e) {
    console.warn(`Error fetching ${key}:`, e);
    return null;
  }
};

export interface EthereumProviderHook {
  provider: Provider | null;
  signer: Signer | null;
}

export const useEthereumProvider = (): EthereumProviderHook => {
  const { wallet } = useWallet();
  const provider = useMemo(() => getEthereumProvider(), [wallet]);
  const signer = useMemo(() => getEthereumSigner(), [wallet]);

  return { provider, signer: signer || null };
};
