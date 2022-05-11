import React from 'react';
import { useSetRecoilState } from 'recoil';
import PageContainer from '../../components/common/page/PageContainer';
import { usePaths } from '../../components/common/routes/paths';
import GenerateAllowListMerkleTree from '../../components/merkle/GenerateAllowListMerkleTree';
import { AllowListMerkleTreeDetails, allowListMerkleTreesSelector } from '../../data/merkleTrees';
import { usePageTitle } from '../../hooks/page';

const AllowListMerkleTreePage = () => {
  usePageTitle('New Merkle Tree');

  const { gotoMerkleTrees } = usePaths();

  const setMerkleRoot = useSetRecoilState(allowListMerkleTreesSelector);

  const handleGenerateMerkleTree = (merkleTree: AllowListMerkleTreeDetails) => {
    setMerkleRoot((merkleTrees) => [...merkleTrees, merkleTree]);
    gotoMerkleTrees();
  };

  return (
    <PageContainer>
      <GenerateAllowListMerkleTree onGenerateMerkleTree={handleGenerateMerkleTree} />
    </PageContainer>
  );
};
export default AllowListMerkleTreePage;
