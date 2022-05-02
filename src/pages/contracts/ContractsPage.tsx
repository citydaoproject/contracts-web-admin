import React from 'react';
import PageContainer from '../../components/common/page/PageContainer';
import DeployedContractsSection from '../../components/contracts/DeployedContractsSection';
import ConnectWalletPage from '../../components/wallet/ConnectWalletPage';
import { usePageTitle } from '../../hooks/page';
import { useWallet } from '../../hooks/wallet';

const ContractsPage = () => {
  usePageTitle('Contracts');
  const { wallet } = useWallet({ autoConnect: true });

  if (!wallet) {
    return <ConnectWalletPage />;
  }

  return (
    <PageContainer>
      <DeployedContractsSection />
    </PageContainer>
  );
};
export default ContractsPage;
