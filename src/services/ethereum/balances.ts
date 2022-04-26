import { ethers } from 'ethers';
import pTimeout from 'p-timeout';
import { getEthereumProvider } from './provider';

/**
 * Fetches the native currency balance for the user.
 *
 * Assums that the provider is already connected, or returns 0;
 */
export const getNativeCurrencyBalance = async (address: string): Promise<number> => {
  const provider = getEthereumProvider();
  if (!provider) {
    console.warn('No ethereum provider when asking for native currency balance');
    return 0;
  }
  try {
    const balance = await pTimeout(provider.getBalance(address), 1000);
    return parseFloat(ethers.utils.formatEther(balance));
  } catch (e) {
    console.error('Error fetching native currency balance:', e);
    throw Error('Error fetching native currency balance. Please verify MetaMask extension can read data on all sites.');
  }
};
