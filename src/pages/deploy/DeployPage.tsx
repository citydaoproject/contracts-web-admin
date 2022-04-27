import React from 'react';
import PageContainer from '../../components/common/page/PageContainer';
import DeployContractsSection from '../../components/contracts/DeployContractsSection';
import ConnectWalletButton from '../../components/wallet/ConnectWalletButton';
import { usePageTitle } from '../../hooks/page';
import { useWallet } from '../../hooks/wallet';

const DeployPage = () => {
  usePageTitle('Deploy Contracts');
  const { wallet } = useWallet({ autoConnect: true });

  if (!wallet) {
    return <ConnectWalletButton />;
  }

  return (
    <PageContainer>
      <DeployContractsSection wallet={wallet} />
    </PageContainer>
  );
};
export default DeployPage;
