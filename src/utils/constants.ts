import { ethers } from 'ethers';

export const isValidAddress = (address: string) => {
  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
};
