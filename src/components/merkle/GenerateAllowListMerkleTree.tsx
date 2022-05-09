import { EthereumAddress } from '@citydao/parcel-contracts/src/constants/accounts';
import {
  AllowListByAddress,
  buildMerkleTreeForAllowList,
} from '@citydao/parcel-contracts/src/contracts/AllowListClaim';
import { BigNumberish } from 'ethers';
import React, { useState } from 'react';
import { AllowListMerkleTreeDetails } from '../../data/merkleTrees';
import DefaultButton from '../common/forms/DefaultButton';
import DetailField from '../common/typography/DetailField';
import AllowListMerkleTreeAllowances from './AlowListMerkleTreeAllowances';

export interface GenerateAllowListMerkleTreeProps {
  onGenerateMerkleTree?: (merkleTree: AllowListMerkleTreeDetails) => void;
}

const GenerateAllowListMerkleTree = ({ onGenerateMerkleTree }: GenerateAllowListMerkleTreeProps) => {
  const [allowList, setAllowList] = useState<AllowListByAddress>({});

  const handleAddAllowance = (account: EthereumAddress, allowance: BigNumberish) => {
    setAllowList({ ...allowList, [account]: allowance });
  };

  const handleRemoveAllowance = (account: EthereumAddress, _allowance: BigNumberish) => {
    const newAllowList = { ...allowList };
    delete newAllowList[account];
    setAllowList(newAllowList);
  };

  const handleGenerateMerkleTree = () => {
    const newMerkleTree = buildMerkleTreeForAllowList(allowList);
    const merkleTreeDetails: AllowListMerkleTreeDetails = {
      allowList,
      root: newMerkleTree.getHexRoot(),
    };

    if (onGenerateMerkleTree) {
      onGenerateMerkleTree(merkleTreeDetails);
    }
  };

  return (
    <DetailField>
      <AllowListMerkleTreeAllowances
        title="Generate Merkle Tree"
        allowList={allowList}
        onAddAllowance={handleAddAllowance}
        onRemoveAllowance={handleRemoveAllowance}
      />
      <DefaultButton onClick={handleGenerateMerkleTree}>Generate Merkle Tree</DefaultButton>
    </DetailField>
  );
};
export default GenerateAllowListMerkleTree;
