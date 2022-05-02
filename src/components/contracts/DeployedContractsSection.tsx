import React from 'react';
import { useRecoilValue } from 'recoil';
import { networkProxyContractSelector } from '../../data/proxyContracts';
import SectionTitle from '../common/typography/SectionTitle';
import ProxyContractSection from './ProxyContractSection';

export interface DeployedContractsSectionProps {}

const DeployedContractsSection = ({}: DeployedContractsSectionProps) => {
  const proxyContracts = useRecoilValue(networkProxyContractSelector);
  return (
    <>
      <SectionTitle>Deployed Contracts (Proxies)</SectionTitle>
      {proxyContracts.length > 0 ? (
        proxyContracts.map((proxyContract) => (
          <ProxyContractSection proxyContractInfo={proxyContract} key={proxyContract.address} />
        ))
      ) : (
        <div>No proxy contracts deployed</div>
      )}
    </>
  );
};
export default DeployedContractsSection;
