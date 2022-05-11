import React from 'react';
import { useRecoilState } from 'recoil';
import { AllowListMerkleTreeDetails, allowListMerkleTreesSelector } from '../../data/merkleTrees';
import { newMerkleTreePath } from '../common/routes/paths';
import RouteButton from '../common/routes/RouteButton';
import DetailField from '../common/typography/DetailField';
import SectionTitle from '../common/typography/SectionTitle';
import AllowListMerkleTreeSection from './AllowListMerkleTreeSection';

export interface MerkleTreesSectionProps {}

const MerkleTreesSection = ({}: MerkleTreesSectionProps) => {
  const [allowListMerkleTrees, setAllowListMerkleTrees] = useRecoilState(allowListMerkleTreesSelector);

  const handleRemoveAllowListMerkleTree = (merkleTree: AllowListMerkleTreeDetails) => {
    setAllowListMerkleTrees((prevAllowListMerkleTrees) =>
      prevAllowListMerkleTrees.filter((allowListMerkleTree) => allowListMerkleTree.root !== merkleTree.root),
    );
  };

  return (
    <>
      <SectionTitle>Merkle Trees</SectionTitle>
      {allowListMerkleTrees.map((merkleTree) => (
        <AllowListMerkleTreeSection
          key={merkleTree.root}
          merkleTree={merkleTree}
          onRemoveMerkleTree={handleRemoveAllowListMerkleTree}
        />
      ))}
      <DetailField>
        <RouteButton path={newMerkleTreePath}>New</RouteButton>
      </DetailField>
    </>
  );
};
export default MerkleTreesSection;
