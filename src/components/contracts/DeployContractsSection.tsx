import React from 'react';
import { WalletDetails } from '../../data/wallet';
import SectionTitle from '../common/typography/SectionTitle';
import DeployLogicContract from './DeployLogicContract';
import { logicContractDefinitions } from './logicContracts';

export interface DeployContractsSectionProps {
  wallet: WalletDetails;
}

const DeployContractsSection = ({ wallet }: DeployContractsSectionProps) => (
  <>
    <SectionTitle>Deploy Contracts</SectionTitle>
    {logicContractDefinitions.map((logicContractDefinition) => (
      <DeployLogicContract
        key={logicContractDefinition.type}
        logicContractDefinition={logicContractDefinition}
        wallet={wallet}
      />
    ))}
  </>
);
export default DeployContractsSection;
