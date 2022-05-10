import Typography from '@mui/material/Typography';
import * as React from 'react';
import PageContainer from '../../components/common/page/PageContainer';
import { usePageTitle } from '../../hooks/page';

export const HomePage = () => {
  usePageTitle();

  return (
    <PageContainer>
      <Typography gutterBottom>Please choose an action from the left.</Typography>
      <Typography gutterBottom>To get started, follow these simple steps:</Typography>
      <div>
        <ol>
          <li>
            Click <strong>Connect Wallet</strong> from the Wallet menu.
          </li>
          <li>
            Click <strong>Switch Ethereum Network</strong> from the Wallet menu if you want to switch between Rinkeby
            and Mainnet.
          </li>
          <li>
            Deploy the logic contracts from the <strong>Deploy</strong> page.
          </li>
          <li>
            Deploy the proxy contracts from the <strong>Deploy</strong> page.
          </li>
          <li>
            Update contract settings fromt he <strong>Contracts</strong> page.
          </li>
          <li>
            If you need to generate a Merkle Root, go to the <strong>New Merkle Tree</strong> page and copy the Merkle
            Root for the contract.
          </li>
        </ol>
      </div>
    </PageContainer>
  );
};
