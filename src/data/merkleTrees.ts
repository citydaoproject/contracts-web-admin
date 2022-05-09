import { atom, DefaultValue, selector } from 'recoil';
import { AllowListByAddress } from '../../../parcel-contracts/src/contracts/AllowListClaim';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage';

export interface AllowListMerkleTreeDetails {
  allowList: AllowListByAddress;
  root: string;
}

const allowListMerkleTreeStorageKey = 'allowListMerkleTrees';

const loadAllowListMerkleTrees = (): AllowListMerkleTreeDetails[] =>
  getLocalStorage(allowListMerkleTreeStorageKey) || [];

const updateAllowListMerkleTrees = (allowListMerkleTrees: AllowListMerkleTreeDetails[]): void => {
  setLocalStorage(allowListMerkleTreeStorageKey, allowListMerkleTrees);
};

const removeAllowListMerkleTrees = (): void => {
  removeLocalStorage(allowListMerkleTreeStorageKey);
};

const allowListMerkleTreesState = atom<AllowListMerkleTreeDetails[]>({
  key: 'allowListMerkleTrees',
  default: loadAllowListMerkleTrees(),
});

export const allowListMerkleTreesSelector = selector<AllowListMerkleTreeDetails[]>({
  key: 'allowListMerkleTreesSelector',
  get: ({ get }) => get(allowListMerkleTreesState),
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue || newValue === null) {
      removeAllowListMerkleTrees();
      set(allowListMerkleTreesState, []);
      return;
    }

    updateAllowListMerkleTrees(newValue);
    set(allowListMerkleTreesState, newValue);
  },
});
