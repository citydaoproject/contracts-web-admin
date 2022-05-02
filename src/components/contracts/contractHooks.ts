import { Contract, ContractFactory } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useWallet } from '../../hooks/wallet';
import { attachContract, FactoryContract } from '../../services/ethereum/contracts';

export interface ContractLoaderHook<C extends Contract, K extends KeyOfGetterFunction<C>> {
  contract?: C;
  values?: ContractValues<C, K>;
}

export type ContractValues<C extends Contract, K extends KeyOfGetterFunction<C>> = {
  [P in K]: Awaited<ReturnType<C[K]>>;
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
  address: string,
  keys: K[],
): ContractLoaderHook<C, K> => {
  const { wallet } = useWallet();

  const contract = useMemo(() => attachContract<F, C>(factory, address), [address, wallet]);
  const [values, setValues] = useState<ContractValues<C, K>>();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchValues();
  }, [contract]);

  const fetchValues = async () => {
    if (!contract) {
      setValues(undefined);
      return;
    }

    const fetchedValues = await Promise.all(keys.map((key) => contract[key]()));

    setValues(
      fetchedValues.reduce((acc, fetchedValue, index) => {
        acc[keys[index]] = fetchedValue;
        return acc;
      }, {} as ContractValues<C, K>),
    );
  };

  return { contract, values };
};
