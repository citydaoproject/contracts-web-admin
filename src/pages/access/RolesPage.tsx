import React from 'react';
import RolesSection from '../../components/access/RolesSection';
import PageContainer from '../../components/common/page/PageContainer';
import { RolesParams } from '../../components/common/routes/paths';
import { LogicContractType } from '../../components/contracts/logicContracts';
import ConnectWalletPage from '../../components/wallet/ConnectWalletPage';
import { usePageParams, usePageTitle } from '../../hooks/page';
import { useWallet } from '../../hooks/wallet';

const RolesPage = () => {
  usePageTitle('Roles');
  const { wallet } = useWallet({ autoConnect: true });
  const rolesParams = usePageParams<keyof RolesParams>();

  if (!wallet) {
    return <ConnectWalletPage />;
  }

  return (
    <PageContainer>
      <RolesSection
        wallet={wallet}
        type={rolesParams.type as LogicContractType}
        contractAddress={rolesParams.address}
      />
    </PageContainer>
  );
};
export default RolesPage;
