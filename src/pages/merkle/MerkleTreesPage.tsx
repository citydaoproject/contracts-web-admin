import React from 'react';
import WidePageContainer from '../../components/common/page/WidePageContainer';
import MerkleTreesSection from '../../components/merkle/MerkleTreesSection';
import { usePageTitle } from '../../hooks/page';

const MerkleTreesPage = () => {
  usePageTitle('Merkle Trees');

  return (
    <WidePageContainer>
      <MerkleTreesSection />
    </WidePageContainer>
  );
};
export default MerkleTreesPage;
