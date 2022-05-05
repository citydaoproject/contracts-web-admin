import { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { useEffect, useState } from 'react';
import {
  executeTransaction,
  getTransactionReceipt,
  getTransactionResponse,
} from '../../services/ethereum/transactions';

export interface FetchTransactionHook {
  response: TransactionResponse | null;
  receipt: TransactionReceipt | null;
  status: TransactionStatus;
}

export enum TransactionStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
}

export const useFetchTransaction = (transactionHash: string | null): FetchTransactionHook => {
  const [response, setResponse] = useState<TransactionResponse | null>(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.Pending);

  useEffect(() => {
    if (!transactionHash) {
      return;
    }

    // noinspection JSIgnoredPromiseFromCall
    fetchTransactionResponse(transactionHash);

    // noinspection JSIgnoredPromiseFromCall
    repeatUntil(() => fetchTransactionReceipt(transactionHash));
  }, [transactionHash]);

  const fetchTransactionResponse = async (transactionHash: string): Promise<void> => {
    const response = await getTransactionResponse(transactionHash);
    setResponse(response);
  };

  const fetchTransactionReceipt = async (transactionHash: string): Promise<boolean> => {
    const receipt = await getTransactionReceipt(transactionHash);
    const transactionStatus = determineTransactionStatus(receipt);
    setStatus(transactionStatus);
    setReceipt(receipt);
    return transactionStatus === TransactionStatus.Confirmed;
  };

  return { response, receipt, status };
};

export interface ExecuteTransactionHook extends FetchTransactionHook {
  execute: (overrideTransactionRequest?: TransactionRequest) => Promise<TransactionReceipt | null>;
  executing: boolean;
}

export const useExecuteTransaction = (transactionRequest?: TransactionRequest): ExecuteTransactionHook => {
  const [response, setResponse] = useState<TransactionResponse | null>(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.Pending);
  const [executing, setExecuting] = useState(false);

  const execute = async (overrideTransactionRequest?: TransactionRequest) => {
    setExecuting(true);

    const request = overrideTransactionRequest || transactionRequest;
    if (!request) {
      console.warn('No transaction request provided');
      return null;
    }

    try {
      const response = await executeTransaction(request);
      setResponse(response);

      if (!response) {
        console.log('No response from transaction');
        return null;
      }

      await repeatUntil(() => fetchTransactionReceipt(response.hash));

      return getTransactionReceipt(response.hash);
    } finally {
      setExecuting(false);
    }
  };

  const fetchTransactionReceipt = async (transactionHash: string): Promise<boolean> => {
    const receipt = await getTransactionReceipt(transactionHash);
    const transactionStatus = determineTransactionStatus(receipt);
    setStatus(transactionStatus);
    setReceipt(receipt);
    return transactionStatus === TransactionStatus.Confirmed;
  };

  return { response, receipt, status, execute, executing };
};

const determineTransactionStatus = (receipt: TransactionReceipt | null): TransactionStatus => {
  if (!receipt) {
    return TransactionStatus.Pending;
  }

  if (receipt.confirmations > 0) {
    return TransactionStatus.Confirmed;
  }

  return TransactionStatus.Pending;
};

const repeatUntil = async (action: () => Promise<boolean>, interval: number = 1000): Promise<void> => {
  while (true) {
    if (await action()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};
