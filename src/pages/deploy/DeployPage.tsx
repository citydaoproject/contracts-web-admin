import React from 'react';
import SectionTitle from '../../components/common/typography/SectionTitle';
import DeployLogicContract from '../../components/contracts/DeployLogicContract';
import { logicContractDefinitions } from '../../components/contracts/logicContracts';
import ConnectWalletButton from '../../components/wallet/ConnectWalletButton';
import { usePageTitle } from '../../hooks/page';
import { useWallet } from '../../hooks/wallet';

const DeployPage = () => {
  usePageTitle('Deploy Contracts');
  const { wallet } = useWallet({ autoConnect: true });

  return (
    <>
      <SectionTitle>Deploy Contracts</SectionTitle>
      {wallet ? (
        logicContractDefinitions.map((logicContractDefinition) => (
          <DeployLogicContract
            key={logicContractDefinition.type}
            logicContractDefinition={logicContractDefinition}
            wallet={wallet}
          />
        ))
      ) : (
        <ConnectWalletButton />
      )}
    </>
  );
};
export default DeployPage;
