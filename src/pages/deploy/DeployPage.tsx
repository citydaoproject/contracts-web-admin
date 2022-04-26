import React from 'react';
import { usePageTitle } from '../../hooks/page';
import { useWallet } from '../../hooks/wallet';

const DeployPage = () => {
  usePageTitle('Deploy Contracts');
  useWallet({ autoConnect: true });

  return <div>Deploy Contracts</div>;
};
export default DeployPage;
