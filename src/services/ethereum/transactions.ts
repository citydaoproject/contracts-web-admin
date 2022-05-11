import { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { connectEthereumProvider, isUserRejectedError } from './provider';

export const executeTransaction = async (
  transactionRequest: TransactionRequest,
): Promise<TransactionResponse | null> => {
  const provider = await connectEthereumProvider();
  const signer = provider.getSigner();
  try {
    return await signer.sendTransaction(transactionRequest);
  } catch (e) {
    if (isUserRejectedError(e)) {
      return null;
    }
    throw e;
  }
};

export const getTransactionResponse = async (transactionHash: string): Promise<TransactionResponse | null> => {
  const provider = await connectEthereumProvider();
  return provider.getTransaction(transactionHash);
};

export const getTransactionReceipt = async (transactionHash: string): Promise<TransactionReceipt | null> => {
  const provider = await connectEthereumProvider();
  return provider.getTransactionReceipt(transactionHash);
};
