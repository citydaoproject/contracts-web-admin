import React from 'react';
import { useRecoilValue } from 'recoil';
import { allowListMerkleTreesSelector } from '../../data/merkleTrees';
import { newMerkleTreesPath } from '../common/routes/paths';
import RouteButton from '../common/routes/RouteButton';
import DetailField from '../common/typography/DetailField';
import SectionTitle from '../common/typography/SectionTitle';
import AllowListMerkleTreeSection from './AllowListMerkleTreeSection';

export interface MerkleTreesSectionProps {}

const MerkleTreesSection = ({}: MerkleTreesSectionProps) => {
  const allowListMerkleTrees = useRecoilValue(allowListMerkleTreesSelector);

  return (
    <>
      <SectionTitle>Merkle Trees</SectionTitle>
      {allowListMerkleTrees.map((merkleTree) => (
        <AllowListMerkleTreeSection key={merkleTree.root} merkleTree={merkleTree} />
      ))}
      <DetailField>
        <RouteButton path={newMerkleTreesPath}>New</RouteButton>
      </DetailField>
    </>
  );
};
export default MerkleTreesSection;
