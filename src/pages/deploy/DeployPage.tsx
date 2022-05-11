import React from 'react';
import PageContainer from '../../components/common/page/PageContainer';
import DeployContractsSection from '../../components/contracts/DeployContractsSection';
import ConnectWalletPage from '../../components/wallet/ConnectWalletPage';
import { usePageTitle } from '../../hooks/page';
import { useWallet } from '../../hooks/wallet';

const DeployPage = () => {
  usePageTitle('Deploy Contracts');
  const { wallet } = useWallet({ autoConnect: true });

  if (!wallet) {
    return <ConnectWalletPage />;
  }

  return (
    <PageContainer>
      <DeployContractsSection wallet={wallet} />
    </PageContainer>
  );
};
export default DeployPage;
